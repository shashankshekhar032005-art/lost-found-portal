import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ReportFound() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    dateFound: "",
    location: "",
    color: "",
    contact: "",
    additionalDetails: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.itemName,
            description: formData.description,

            category:
              formData.category === "Other"
                ? "Others"
                : formData.category === "Jewellery"
                ? "Accessories"
                : formData.category,

            type: "Found",

            location: formData.location,

            date: formData.dateFound,

            contactName: formData.contact,

            contactPhone: formData.contact,
          }),
        }
      );

      const data = await response.json();

      console.log("FOUND ITEM RESPONSE:", data);

      if (!response.ok) {
        alert(
          data.message ||
            "Server error while creating found item"
        );
        return;
      }

      alert("Found item reported successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error("Found item error:", error);

      alert("Unable to connect to the server.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">

      {/* ================= HEADER ================= */}

      <div className="report-header">

        <Link
          to="/dashboard"
          className="back-link"
        >
          ← Back to Dashboard
        </Link>

        <h1>Report a Found Item</h1>

        <p>
          Help return a lost item to its rightful owner
          by providing details about the item you found.
        </p>

      </div>


      {/* ================= FORM ================= */}

      <div className="report-form-card">

        <form onSubmit={handleSubmit}>

          {/* ================= ITEM INFORMATION ================= */}

          <div className="form-section">

            <h2>📋 Item Information</h2>

            <p className="form-section-description">
              Tell us about the item you found.
            </p>


            {/* Item Name */}

            <div className="form-group">

              <label htmlFor="itemName">
                Item Name <span>*</span>
              </label>

              <input
                type="text"
                id="itemName"
                name="itemName"
                placeholder="e.g. Black Wallet"
                value={formData.itemName}
                onChange={handleChange}
                required
              />

            </div>


            {/* Category */}

            <div className="form-group">

              <label htmlFor="category">
                Category <span>*</span>
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select a category
                </option>

                <option value="Bags">
                  Bags
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Documents">
                  Documents / ID Cards
                </option>

                <option value="Books">
                  Books / Stationery
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="Accessories">
                  Jewellery / Accessories
                </option>

                <option value="Keys">
                  Keys
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* Color */}

            <div className="form-group">

              <label htmlFor="color">
                Color
              </label>

              <input
                type="text"
                id="color"
                name="color"
                placeholder="e.g. Black"
                value={formData.color}
                onChange={handleChange}
              />

            </div>


            {/* Description */}

            <div className="form-group">

              <label htmlFor="description">
                Description <span>*</span>
              </label>

              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Describe the item you found..."
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* ================= DATE & LOCATION ================= */}

          <div className="form-section">

            <h2>📍 When & Where?</h2>

            <p className="form-section-description">
              Tell us when and where you found the item.
            </p>


            {/* Date Found */}

            <div className="form-group">

              <label htmlFor="dateFound">
                Date Found <span>*</span>
              </label>

              <input
                type="date"
                id="dateFound"
                name="dateFound"
                value={formData.dateFound}
                onChange={handleChange}
                required
              />

            </div>


            {/* Location */}

            <div className="form-group">

              <label htmlFor="location">
                Location Found <span>*</span>
              </label>

              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. College Cafeteria"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* ================= CONTACT ================= */}

          <div className="form-section">

            <h2>📞 Contact Information</h2>

            <p className="form-section-description">
              Provide your contact details so the owner
              can contact you.
            </p>


            {/* Contact */}

            <div className="form-group">

              <label htmlFor="contact">
                Contact Number / Email <span>*</span>
              </label>

              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="e.g. 9876543210 or student@email.com"
                value={formData.contact}
                onChange={handleChange}
                required
              />

            </div>


            {/* Additional Details */}

            <div className="form-group">

              <label htmlFor="additionalDetails">
                Additional Details
              </label>

              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows="4"
                placeholder="Where are you keeping the item? Any other useful information?"
                value={formData.additionalDetails}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* ================= INFORMATION BOX ================= */}

          <div className="report-info-box">

            <strong>💡 Tip</strong>

            <p>
              Don't reveal highly sensitive details publicly.
              Keep some identifying information private so
              the actual owner can prove that the item belongs
              to them.
            </p>

          </div>


          {/* ================= BUTTONS ================= */}

          <div className="form-actions">

            <Link to="/dashboard">

              <button
                type="button"
                className="cancel-button"
              >
                Cancel
              </button>

            </Link>


            <button
              type="submit"
              className="submit-report-button"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "🔎 Submit Found Report"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ReportFound;

