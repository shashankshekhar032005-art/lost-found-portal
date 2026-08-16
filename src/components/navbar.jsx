import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          🔎 Lost & Found
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/lost-items">
            Lost Items
          </Link>

          <Link to="/found-items">
            Found Items
          </Link>

          <Link to="/report-lost">
            Report Lost
          </Link>

          <Link to="/report-found">
            Report Found
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;