import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  // Temporary sample data
  // Later these values will come from MongoDB

  const stats = {
    total: 5,
    lost: 3,
    found: 2,
    resolved: 1,
  };

  const recentReports = [
    {
      id: 1,
      title: "Black Backpack",
      type: "Lost",
      location: "College Library",
      date: "13 August 2026",
      status: "Active",
    },
    {
      id: 2,
      title: "Student ID Card",
      type: "Found",
      location: "Main Gate",
      date: "12 August 2026",
      status: "Active",
    },
    {
      id: 3,
      title: "Wireless Earphones",
      type: "Lost",
      location: "Cafeteria",
      date: "10 August 2026",
      status: "Resolved",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <section className="dashboard-header">

        <div>
          <p className="dashboard-welcome">
            Welcome back 👋
          </p>

          <h1>
            Student Dashboard
          </h1>

          <p>
            Manage your lost and found reports from here.
          </p>
        </div>

        <div className="dashboard-header-buttons">

          <Link to="/report-lost">
            <button className="primary-button">
              📢 Report Lost
            </button>
          </Link>

          <Link to="/report-found">
            <button className="secondary-button">
              🔎 Report Found
            </button>
          </Link>

        </div>

        <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        🚪 Logout
      </button>

      </section>



      {/* ================= STATISTICS ================= */}

      <section className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>
            <p>Total Reports</p>
            <h2>{stats.total}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🔴
          </div>

          <div>
            <p>Lost Items</p>
            <h2>{stats.lost}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🟢
          </div>

          <div>
            <p>Found Items</p>
            <h2>{stats.found}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>
            <p>Resolved</p>
            <h2>{stats.resolved}</h2>
          </div>

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-grid">

          <Link
            to="/report-lost"
            className="action-card"
          >
            <span className="action-icon">
              📢
            </span>

            <h3>
              Report Lost Item
            </h3>

            <p>
              Lost something? Create a report
              and let others help you find it.
            </p>
          </Link>


          <Link
            to="/report-found"
            className="action-card"
          >
            <span className="action-icon">
              🔎
            </span>

            <h3>
              Report Found Item
            </h3>

            <p>
              Found something? Report it so
              the owner can find it.
            </p>
          </Link>


          <Link
            to="/my-reports"
            className="action-card"
          >
            <span className="action-icon">
              📋
            </span>

            <h3>
              My Reports
            </h3>

            <p>
              View and manage all your
              lost and found reports.
            </p>
          </Link>


          <Link
            to="/profile"
            className="action-card"
          >
            <span className="action-icon">
              👤
            </span>

            <h3>
              My Profile
            </h3>

            <p>
              View and update your account
              information.
            </p>
          </Link>

        </div>

      </section>


      {/* ================= RECENT REPORTS ================= */}

      <section className="recent-reports">

        <div className="section-heading">

          <div>
            <h2>
              Recent Reports
            </h2>

            <p>
              Your latest lost and found reports.
            </p>
          </div>

          <Link to="/my-reports">
            View All →
          </Link>

        </div>


        <div className="reports-table">

          <div className="table-header">
            <span>Item</span>
            <span>Type</span>
            <span>Location</span>
            <span>Date</span>
            <span>Status</span>
          </div>


          {recentReports.map((report) => (

            <div
              className="table-row"
              key={report.id}
            >

              <strong>
                {report.title}
              </strong>

              <span
                className={
                  report.type === "Lost"
                    ? "report-lost"
                    : "report-found"
                }
              >
                {report.type}
              </span>

              <span>
                📍 {report.location}
              </span>

              <span>
                {report.date}
              </span>

              <span
                className={
                  report.status === "Resolved"
                    ? "status-resolved"
                    : "status-active"
                }
              >
                {report.status}
              </span>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;