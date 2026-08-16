import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/itemcard";

function Home() {
  const [search, setSearch] = useState("");

  // Temporary sample data
  // Later this will come from MongoDB
  const items = [
    {
      id: 1,
      title: "Black Backpack",
      category: "Bags",
      location: "College Library",
      date: "13 August 2026",
      type: "Lost",
    },
    {
      id: 2,
      title: "Student ID Card",
      category: "Documents",
      location: "Main Gate",
      date: "12 August 2026",
      type: "Found",
    },
    {
      id: 3,
      title: "Wireless Earphones",
      category: "Electronics",
      location: "Cafeteria",
      date: "11 August 2026",
      type: "Lost",
    },
  ];

  // Search items
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* ================= HERO SECTION ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            🎒 College Lost & Found
          </span>

          <h1>
            Find What You've Lost.
            <br />
            Return What You've Found.
          </h1>

          <p>
            A simple and secure platform for students to report,
            search and recover lost belongings.
          </p>

          <div className="hero-buttons">

            <Link to="/report-lost">
              <button className="primary-button">
                📢 Report Lost Item
              </button>
            </Link>

            <Link to="/report-found">
              <button className="secondary-button">
                🔎 Report Found Item
              </button>
            </Link>

          </div>

        </div>

      </section>


      {/* ================= SEARCH SECTION ================= */}

      <section className="search-section">

        <h2>Find an Item</h2>

        <p>
          Search for items reported by students.
        </p>

        <div className="home-search">

          <input
            type="text"
            placeholder="🔍 Search for an item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>
            Search
          </button>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-it-works">

        <h2>How It Works</h2>

        <p className="section-description">
          Recovering your belongings is simple.
        </p>

        <div className="steps">

          <div className="step">

            <div className="step-icon">
              📢
            </div>

            <h3>Report</h3>

            <p>
              Report an item you have lost or found
              with its details and location.
            </p>

          </div>


          <div className="step">

            <div className="step-icon">
              🔍
            </div>

            <h3>Search</h3>

            <p>
              Search through reported items using
              keywords and filters.
            </p>

          </div>


          <div className="step">

            <div className="step-icon">
              🤝
            </div>

            <h3>Recover</h3>

            <p>
              Connect with the person who found
              or lost the item.
            </p>

          </div>

        </div>

      </section>


      {/* ================= RECENT ITEMS ================= */}

      <section className="recent-items">

        <h2>Recently Reported Items</h2>

        <p className="section-description">
          Latest lost and found items reported by students.
        </p>


        <div className="item-grid">

          {filteredItems.length > 0 ? (

            filteredItems.map((item) => (

              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                location={item.location}
                date={item.date}
                type={item.type}
              />

            ))

          ) : (

            <p className="no-results">
              No items found.
            </p>

          )}

        </div>

      </section>


      {/* ================= CALL TO ACTION ================= */}

      <section className="cta-section">

        <h2>Lost Something?</h2>

        <p>
          Don't wait. Report your lost item and
          let other students help you find it.
        </p>

        <Link to="/report-lost">
          <button className="primary-button">
            Report Lost Item
          </button>
        </Link>

      </section>

    </div>
  );
}

export default Home;