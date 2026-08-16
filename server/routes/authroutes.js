const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// =====================================================
// AUTHENTICATION MIDDLEWARE
// =====================================================

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No authorization token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};


// =====================================================
// REGISTER
// =====================================================

router.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      phone,
      college,
    } = req.body;


    // Check required fields

    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, email and password are required",
      });
    }


    // Check existing user

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists with this email",
      });
    }


    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 10);


    // Create user

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || "",
      college: college || "",
    });


    res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "Registration error:",
      error
    );

    res.status(500).json({
      message:
        "Server error during registration",
    });
  }
});


// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;


    // Check required fields

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }


    // Find user

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }


    // Check password

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }


    // Create JWT

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      message:
        "Server error during login",
    });
  }
});


// =====================================================
// GET MY PROFILE
// =====================================================

router.get(
  "/profile",
  authenticateToken,
  async (req, res) => {

    try {

      const user = req.user;

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId || "",
        phone: user.phone || "",
        college: user.college || "",
        role: user.role,
      });

    } catch (error) {

      console.error(
        "Get profile error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching profile",
      });
    }
  }
);


// =====================================================
// UPDATE MY PROFILE
// =====================================================

router.put(
  "/profile",
  authenticateToken,
  async (req, res) => {

    try {

      const {
        name,
        email,
        studentId,
        phone,
        college,
      } = req.body;


      // Basic validation

      if (!name || !email) {
        return res.status(400).json({
          message:
            "Name and email are required",
        });
      }


      // Check if another user already has this email

      const existingUser =
        await User.findOne({
          email: email.toLowerCase(),
          _id: { $ne: req.user._id },
        });

      if (existingUser) {
        return res.status(400).json({
          message:
            "Another account already uses this email",
        });
      }


      // Update user

      const updatedUser =
        await User.findByIdAndUpdate(
          req.user._id,
          {
            name,
            email: email.toLowerCase(),
            studentId: studentId || "",
            phone: phone || "",
            college: college || "",
          },
          {
            new: true,
            runValidators: true,
          }
        );


      res.json({
        message:
          "Profile updated successfully",

        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        studentId:
          updatedUser.studentId || "",
        phone:
          updatedUser.phone || "",
        college:
          updatedUser.college || "",
        role: updatedUser.role,
      });

    } catch (error) {

      console.error(
        "Update profile error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating profile",
      });
    }
  }
);

router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes are working!"
  });
});

module.exports = router;
