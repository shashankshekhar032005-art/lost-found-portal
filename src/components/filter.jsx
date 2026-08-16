import React from "react";

function Filter({
  category,
  setCategory,
  location,
  setLocation,
  status,
  setStatus,
}) {
  return (
    <div className="filter-container">

      {/* Category */}
      <div className="filter-group">

        <label>Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Documents">Documents</option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>

      </div>

      {/* Location */}
      <div className="filter-group">

        <label>Location</label>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="College Library">
            College Library
          </option>
          <option value="Cafeteria">
            Cafeteria
          </option>
          <option value="Main Gate">
            Main Gate
          </option>
          <option value="Classroom">
            Classroom
          </option>
          <option value="Parking">
            Parking
          </option>
          <option value="Playground">
            Playground
          </option>
        </select>

      </div>

      {/* Status */}
      <div className="filter-group">

        <label>Status</label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Claimed">Claimed</option>
          <option value="Resolved">Resolved</option>
        </select>

      </div>

    </div>
  );
}

export default Filter;