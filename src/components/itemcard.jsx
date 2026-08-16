import React from "react";
import { Link } from "react-router-dom";

function ItemCard({
  id,
  title,
  category,
  location,
  date,
  type,
  image,
}) {
  return (
    <div className="item-card">

      {/* Image */}
      <div className="item-image">

        {image ? (
          <img
            src={image}
            alt={title}
          />
        ) : (
          <div className="image-placeholder">
            📦
          </div>
        )}

      </div>

      {/* Item Information */}
      <div className="item-content">

        <span className={`item-type ${type?.toLowerCase()}`}>
          {type || "Item"}
        </span>

        <h3>{title}</h3>

        <p>
          <strong>Category:</strong> {category}
        </p>

        <p>
          📍 {location}
        </p>

        <p>
          📅 {date}
        </p>

        <Link
          to={`/item/${id}`}
          className="view-button"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ItemCard;