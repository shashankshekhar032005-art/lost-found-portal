import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    phone: "",
    college: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH PROFILE =================

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("PROFILE RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch profile"
          );
        }

        setFormData({
          name: data.name || "",
          email: data.email || "",
          studentId: data.studentId || "",
          phone: data.phone || "",
          college: data.college || "",
        });
      } catch (error) {
        console.error("Profile fetch error:", error);

        setError(
          "Unable to load profile information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ================= SAVE PROFILE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("PROFILE UPDATE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile"
        );
      }

      const profile = data.user || data;

      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        studentId: profile.studentId || "",
        phone: profile.phone || "",
        college: profile.college || "",
      });

      setEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);

      alert(
        error.message || "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="profile-page">

        <div className="profile-container">

          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>

          <div className="no-reports">

            <div>⏳</div>

            <h2>
              Loading Profile...
            </h2>

            <p>
              Fetching your account information.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="profile-page">

        <div className="profile-container">

          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>

          <div className="no-reports">

            <div>⚠️</div>

            <h2>
              Unable to Load Profile
            </h2>

            <p>
              {error}
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>


        {/* ================= PROFILE HEADER ================= */}

        <div className="profile-header">

          <div className="profile-avatar">
            {formData.name
              ? formData.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information.
            </p>

          </div>

        </div>


        {/* ================= PROFILE CARD ================= */}

        <div className="profile-card">

          <div className="profile-card-header">

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Your account details
              </p>

            </div>


            {!editing && (

              <button
                className="edit-profile-button"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>

            )}

          </div>


          <form onSubmit={handleSubmit}>

            <div className="profile-form-grid">

              {/* ================= NAME ================= */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editing}
                />

              </div>


              {/* ================= EMAIL ================= */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editing}
                />

              </div>


              {/* ================= STUDENT ID ================= */}

              <div className="form-group">

                <label htmlFor="studentId">
                  Student ID
                </label>

                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  disabled={!editing}
                />

              </div>


              {/* ================= PHONE ================= */}

              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                />

              </div>


              {/* ================= COLLEGE ================= */}

              <div className="form-group full-width">

                <label htmlFor="college">
                  College / University
                </label>

                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  disabled={!editing}
                />

              </div>

            </div>


            {/* ================= ACTIONS ================= */}

            {editing && (

              <div className="profile-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="submit-report-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "💾 Save Changes"}
                </button>

              </div>

            )}

          </form>

        </div>


        {/* ================= ACCOUNT INFORMATION ================= */}

        <div className="account-card">

          <h2>
            Account Information
          </h2>


          <div className="account-row">

            <span>
              Account Type
            </span>

            <strong>
              Student
            </strong>

          </div>


          <div className="account-row">

            <span>
              Account Status
            </span>

            <span className="status-active">
              Active
            </span>

          </div>


          <div className="account-row">

            <span>
              Member Since
            </span>

            <strong>
              August 2026
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
