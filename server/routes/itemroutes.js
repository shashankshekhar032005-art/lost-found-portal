
const express = require("express");
const Item = require("../models/Item");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ================= AUTHENTICATION MIDDLEWARE =================

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// ================= CREATE ITEM =================

router.post("/", authenticateUser, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date,
      image,
      contactName,
      contactPhone,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !type ||
      !location ||
      !date ||
      !contactName ||
      !contactPhone
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const item = await Item.create({
      title,
      description,
      category,
      type,
      location,
      date,
      image: image || "",
      contactName,
      contactPhone,
      reportedBy: req.user.userId,
    });

    res.status(201).json({
      message: `${type} item reported successfully`,
      item,
    });
  } catch (error) {
    console.error("Create item error:", error);

    res.status(500).json({
      message: "Server error while creating item",
    });
  }
});

// ================= GET ALL ITEMS =================

router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Get items error:", error);

    res.status(500).json({
      message: "Server error while fetching items",
    });
  }
});

// ================= GET LOST ITEMS =================

router.get("/lost", async (req, res) => {
  try {
    const items = await Item.find({
      type: "Lost",
    })
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Get lost items error:", error);

    res.status(500).json({
      message: "Server error while fetching lost items",
    });
  }
});

// ================= GET FOUND ITEMS =================

router.get("/found", async (req, res) => {
  try {
    const items = await Item.find({
      type: "Found",
    })
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Get found items error:", error);

    res.status(500).json({
      message: "Server error while fetching found items",
    });
  }
});

// ================= GET MY REPORTS =================

router.get("/my-reports", authenticateUser, async (req, res) => {
  try {
    const items = await Item.find({
      reportedBy: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Get my reports error:", error);

    res.status(500).json({
      message: "Server error while fetching your reports",
    });
  }
});

// ================= GET SINGLE ITEM =================

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "reportedBy",
      "name email"
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(item);
  } catch (error) {
    console.error("Get item error:", error);

    res.status(500).json({
      message: "Server error while fetching item",
    });
  }
});


router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (item.reportedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own reports",
      });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({
      message: "Report deleted successfully",
    });

  } catch (error) {
    console.error("Delete item error:", error);

    res.status(500).json({
      message: "Server error while deleting item",
    });
  }
});


module.exports = router;