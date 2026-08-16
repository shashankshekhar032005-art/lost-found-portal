import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    college: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("REGISTER BUTTON CLICKED");
    console.log("FORM DATA:", formData);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("SERVER RESPONSE:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      setMessage("Registration successful!");

      // Go to login page after registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("REGISTRATION ERROR:", error);

      setMessage(
        "Cannot connect to server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Create Account</h2>

        <p>Join the Lost & Found Portal</p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* College */}
          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={formData.college}
            onChange={handleChange}
          />

          {/* Register Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        {/* Login Link */}
        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;