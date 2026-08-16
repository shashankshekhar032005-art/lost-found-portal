import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LostItems() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH LOST ITEMS =================

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/items/lost"
        );

        const data = await response.json();

        console.log("LOST ITEMS RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch lost items"
          );
        }

        setLostItems(data);
      } catch (error) {
        console.error("Fetch lost items error:", error);

        setError(
          "Unable to load lost items. Please make sure the server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  // ================= SEARCH & FILTER =================

  const filteredItems = lostItems.filter((item) => {
    const title = item.title || "";
    const location = item.location || "";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="items-page">

      {/* ================= HEADER ================= */}

      <div className="items-header">

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="items-title-row">

          <div>

            <span className="page-badge lost-badge">
              🔴 LOST ITEMS
            </span>

            <h1>Lost Items</h1>

            <p>
              Browse items reported lost by students.
              Maybe you can help someone find theirs!
            </p>

          </div>

          <Link to="/report-lost">

            <button className="primary-button">
              📢 Report Lost Item
            </button>

          </Link>

        </div>

      </div>


      {/* ================= SEARCH & FILTER ================= */}

      <div className="items-filter">

        <div className="item-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search item or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="All">
            All Categories
          </option>

          <option value="Bags">
            Bags
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Documents">
            Documents
          </option>

          <option value="Clothing">
            Clothing
          </option>

          <option value="Wallets">
            Wallets
          </option>

          <option value="Keys">
            Keys
          </option>

          <option value="Jewellery">
            Jewellery / Accessories
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </div>


      {/* ================= RESULTS HEADER ================= */}

      <div className="items-result-header">

        <h2>
          {loading
            ? "Loading Lost Items..."
            : `${filteredItems.length} Lost Item${
                filteredItems.length !== 1 ? "s" : ""
              }`}
        </h2>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div className="empty-items">

          <div>⚠️</div>

          <h3>
            Unable to load items
          </h3>

          <p>
            {error}
          </p>

        </div>
      )}


      {/* ================= LOADING ================= */}

      {loading && !error && (
        <div className="empty-items">

          <div>⏳</div>

          <h3>
            Loading lost items...
          </h3>

          <p>
            Fetching the latest reports from the database.
          </p>

        </div>
      )}


      {/* ================= RESULTS ================= */}

      {!loading && !error && (

        <div className="items-grid">

          {filteredItems.length > 0 ? (

            filteredItems.map((item) => (

              <div
                className="listing-card"
                key={item._id}
              >

                <div className="listing-image">
                  🎒
                </div>

                <div className="listing-content">

                  <div className="listing-top">

                    <span className="lost-label">
                      LOST
                    </span>

                    <span className="listing-category">
                      {item.category}
                    </span>

                  </div>


                  <h3>
                    {item.title}
                  </h3>


                  <p>
                    {item.description}
                  </p>


                  <div className="listing-details">

                    <span>
                      📍 {item.location}
                    </span>

                    <span>
                      📅 {formatDate(item.date)}
                    </span>

                  </div>


                  <Link
                    to={`/item/${item._id}`}
                    className="view-item-button"
                  >
                    View Details →
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-items">

              <div>🔍</div>

              <h3>
                No lost items found
              </h3>

              <p>
                Try changing your search or category filter.
              </p>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default LostItems;
