import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH ITEM =================

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/items/${id}`
        );

        const data = await response.json();

        console.log("ITEM DETAILS RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch item"
          );
        }

        setItem(data);
      } catch (error) {
        console.error("Fetch item error:", error);

        setError(
          "Unable to load item details. Please make sure the server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

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
      <div className="details-page">

        <div className="details-container">

          <Link to="/lost-items" className="back-link">
            ← Back to Items
          </Link>

          <div className="empty-items">

            <div>⏳</div>

            <h3>
              Loading item details...
            </h3>

            <p>
              Fetching information from the database.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // ================= ERROR =================

  if (error || !item) {
    return (
      <div className="details-page">

        <div className="details-container">

          <Link to="/lost-items" className="back-link">
            ← Back to Items
          </Link>

          <div className="empty-items">

            <div>⚠️</div>

            <h3>
              Item not found
            </h3>

            <p>
              {error || "This item does not exist."}
            </p>

          </div>

        </div>

      </div>
    );
  }

  // ================= ITEM TYPE =================

  const isLost = item.type === "Lost";

  return (
    <div className="details-page">

      <div className="details-container">

        <Link
          to={isLost ? "/lost-items" : "/found-items"}
          className="back-link"
        >
          ← Back to {isLost ? "Lost Items" : "Found Items"}
        </Link>


        <div className="details-card">

          {/* ================= ITEM IMAGE ================= */}

          <div className="details-image">
            {isLost ? "🎒" : "📦"}
          </div>


          <div className="details-content">

            {/* ================= BADGES ================= */}

            <div className="details-badges">

              <span
                className={
                  isLost
                    ? "lost-label"
                    : "found-label"
                }
              >
                {isLost ? "LOST" : "FOUND"}
              </span>

              <span className="listing-category">
                {item.category}
              </span>

            </div>


            {/* ================= TITLE ================= */}

            <h1>
              {item.title}
            </h1>


            {/* ================= DESCRIPTION ================= */}

            <p className="details-description">
              {item.description}
            </p>


            {/* ================= INFORMATION ================= */}

            <div className="details-info">

              <div className="detail-row">
                <span>📂 Category</span>
                <strong>
                  {item.category || "Not specified"}
                </strong>
              </div>


              <div className="detail-row">
                <span>🎨 Color</span>
                <strong>
                  {item.color || "Not specified"}
                </strong>
              </div>


              <div className="detail-row">
                <span>📍 Location</span>
                <strong>
                  {item.location || "Not specified"}
                </strong>
              </div>


              <div className="detail-row">
                <span>📅 Date</span>
                <strong>
                  {formatDate(item.date)}
                </strong>
              </div>

            </div>


            {/* ================= ADDITIONAL DETAILS ================= */}

            {item.additionalDetails && (
              <div className="details-extra">

                <h3>
                  Additional Information
                </h3>

                <p>
                  {item.additionalDetails}
                </p>

              </div>
            )}


            {/* ================= CONTACT ================= */}

            <div className="contact-box">

              <h3>
                📞 Contact Reporter
              </h3>

              <p>
                If you have information about this item,
                you can contact the person who reported it.
              </p>

              {item.contactPhone ? (

                <a
                  href={`tel:${item.contactPhone}`}
                  className="contact-button"
                >
                  📞 Contact: {item.contactPhone}
                </a>

              ) : (

                <p>
                  Contact information is not available.
                </p>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ItemDetails;
