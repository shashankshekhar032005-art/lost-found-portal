import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h2>🔎 Lost & Found</h2>

          <p>
            A simple platform to help people report,
            search and recover lost belongings.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/lost-items">Lost Items</Link>
          <Link to="/found-items">Found Items</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        {/* Report */}
        <div className="footer-section">
          <h3>Report</h3>

          <Link to="/report-lost">Report Lost Item</Link>
          <Link to="/report-found">Report Found Item</Link>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>📧 support@lostandfound.com</p>
          <p>📞 +91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Lost & Found System. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;