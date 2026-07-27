import React from "react";

export default function ProductCard({ p, onSelect }) {
  const handleClick = () => {
    if (p.available) onSelect(p);
  };

  return (
    <button
      className={`product-card ${!p.available ? "product-disabled" : ""}`}
      onClick={handleClick}
      disabled={!p.available}
    >
      <div
        className="product-swatch"
        style={{
          background: p.image
            ? `url(${p.image}) center/cover no-repeat`
            : `linear-gradient(150deg, ${p.tone}, #FDEAF0)`,
        }}
      >
        {!p.image && <span className="swatch-ring" />}
        {!p.available && <span className="coming-soon-badge">Coming Soon</span>}
      </div>
      <div className="product-info">
        <div className="product-row">
          <h3>{p.name}</h3>
          <span className="price">${p.price}</span>
        </div>
        <p className="note">{p.note}</p>
      </div>
    </button>
  );
}