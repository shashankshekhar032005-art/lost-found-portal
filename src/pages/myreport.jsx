import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH MY REPORTS =================

  useEffect(() => {
    const fetchMyReports = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your reports.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/items/my-reports",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("MY REPORTS RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch reports"
          );
        }

        setReports(data);
      } catch (error) {
        console.error("My reports error:", error);

        setError(
          "Unable to load your reports. Please make sure the server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, []);

  // ================= DELETE REPORT =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("DELETE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete report"
        );
      }

      // Remove deleted report from screen
      setReports((previousReports) =>
        previousReports.filter(
          (report) => report._id !== id
        )
      );

      alert("Report deleted successfully!");
    } catch (error) {
      console.error("Delete report error:", error);

      alert(
        error.message || "Unable to delete the report."
      );
    }
  };

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="my-reports-page">

        <div className="my-reports-container">

          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>

          <div className="no-reports">

            <div>⏳</div>

            <h2>
              Loading Your Reports...
            </h2>

            <p>
              Fetching your reports from the database.
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="my-reports-page">

      <div className="my-reports-container">

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>


        {/* ================= HEADER ================= */}

        <div className="my-reports-header">

          <div>

            <h1>
              My Reports
            </h1>

            <p>
              Manage the lost and found reports you have
              submitted.
            </p>

          </div>


          <div className="report-buttons">

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

        </div>


        {/* ================= ERROR ================= */}

        {error && (

          <div className="no-reports">

            <div>⚠️</div>

            <h2>
              Unable to Load Reports
            </h2>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* ================= SUMMARY ================= */}

        {!error && (

          <div className="reports-summary">

            <div>

              <strong>
                {reports.length}
              </strong>

              <span>
                Total Reports
              </span>

            </div>


            <div>

              <strong>
                {
                  reports.filter(
                    (report) =>
                      report.type === "Lost"
                  ).length
                }
              </strong>

              <span>
                Lost
              </span>

            </div>


            <div>

              <strong>
                {
                  reports.filter(
                    (report) =>
                      report.type === "Found"
                  ).length
                }
              </strong>

              <span>
                Found
              </span>

            </div>


            <div>

              <strong>
                {
                  reports.filter(
                    (report) =>
                      report.status === "Resolved"
                  ).length
                }
              </strong>

              <span>
                Resolved
              </span>

            </div>

          </div>

        )}


        {/* ================= REPORT LIST ================= */}

        {!error && (

          <div className="my-reports-list">

            {reports.length === 0 ? (

              <div className="no-reports">

                <div>📋</div>

                <h2>
                  No Reports Yet
                </h2>

                <p>
                  You haven't submitted any lost or
                  found reports.
                </p>

                <Link to="/report-lost">

                  <button className="primary-button">
                    Create Your First Report
                  </button>

                </Link>

              </div>

            ) : (

              reports.map((report) => (

                <div
                  className="my-report-card"
                  key={report._id}
                >

                  {/* ICON */}

                  <div className="my-report-icon">

                    {report.type === "Lost"
                      ? "🎒"
                      : "📦"}

                  </div>


                  {/* INFORMATION */}

                  <div className="my-report-info">

                    <div className="my-report-title">

                      <h3>
                        {report.title}
                      </h3>

                      <span
                        className={
                          report.type === "Lost"
                            ? "lost-label"
                            : "found-label"
                        }
                      >
                        {report.type}
                      </span>

                    </div>


                    <p>
                      📂 {report.category}
                    </p>


                    <p>
                      📍 {report.location}
                    </p>


                    <p>
                      📅 {formatDate(report.date)}
                    </p>

                  </div>


                  {/* STATUS + ACTIONS */}

                  <div className="my-report-status">

                    <span
                      className={
                        report.status === "Resolved"
                          ? "status-resolved"
                          : "status-active"
                      }
                    >
                      {report.status || "Active"}
                    </span>


                    <div className="report-card-actions">

                      <Link
                        to={`/item/${report._id}`}
                      >
                        View
                      </Link>


                      <button
                        onClick={() =>
                          handleDelete(report._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyReports;