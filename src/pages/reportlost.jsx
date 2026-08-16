import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ReportLost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    dateLost: "",
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
      const response = await fetch("http://localhost:5000/api/items", {
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
          type: "Lost",
          location: formData.location,
          date: formData.dateLost,
          contactName: formData.contact,
          contactPhone: formData.contact,
        }),
      });

      const data = await response.json();

      console.log("LOST ITEM RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Server error while creating item");
        return;
      }

      alert("Lost item reported successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Lost item error:", error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">

      <div className="report-header">

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>

        <h1>Report a Lost Item</h1>

        <p>
          Provide the details below to help others identify
          and return your lost item.
        </p>

      </div>

      <div className="report-form-card">

        <form onSubmit={handleSubmit}>

          {/* ITEM INFORMATION */}

          <div className="form-section">

            <h2>📋 Item Information</h2>

            <p className="form-section-description">
              Tell us about the item you lost.
            </p>

            <div className="form-group">

              <label htmlFor="itemName">
                Item Name <span>*</span>
              </label>

              <input
                type="text"
                id="itemName"
                name="itemName"
                placeholder="e.g. Black Backpack"
                value={formData.itemName}
                onChange={handleChange}
                required
              />

            </div>

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

                <option value="Bags">Bags</option>
                <option value="Electronics">Electronics</option>
                <option value="Documents">
                  Documents / ID Cards
                </option>
                <option value="Clothing">Clothing</option>
                <option value="Books">
                  Books / Stationery
                </option>
                <option value="Keys">Keys</option>
                <option value="Accessories">
                  Jewellery / Accessories
                </option>
                <option value="Other">Other</option>

              </select>

            </div>

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

            <div className="form-group">

              <label htmlFor="description">
                Description <span>*</span>
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the item in detail..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* DATE AND LOCATION */}

          <div className="form-section">

            <h2>📍 When & Where?</h2>

            <p className="form-section-description">
              Tell us when and where you last saw the item.
            </p>

            <div className="form-group">

              <label htmlFor="dateLost">
                Date Lost <span>*</span>
              </label>

              <input
                type="date"
                id="dateLost"
                name="dateLost"
                value={formData.dateLost}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="location">
                Location Lost <span>*</span>
              </label>

              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. College Library"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* CONTACT */}

          <div className="form-section">

            <h2>📞 Contact Information</h2>

            <p className="form-section-description">
              Provide a way for someone to contact you if
              your item is found.
            </p>

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

            <div className="form-group">

              <label htmlFor="additionalDetails">
                Additional Details
              </label>

              <textarea
                id="additionalDetails"
                name="additionalDetails"
                placeholder="Any additional information that might help..."
                rows="4"
                value={formData.additionalDetails}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="report-info-box">

            <strong>💡 Tip</strong>

            <p>
              Include as many details as possible. A detailed
              description makes it easier for someone to
              identify your lost item.
            </p>

          </div>

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
                : "📢 Submit Lost Report"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ReportLost;
