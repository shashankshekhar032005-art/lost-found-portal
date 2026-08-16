import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">

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
  );
}

export default SearchBar;