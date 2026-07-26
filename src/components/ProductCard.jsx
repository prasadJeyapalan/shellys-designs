import React from "react";

export default function ProductCard({ p, onSelect }) {
  return (
    <button className="product-card" onClick={() => onSelect(p)}>
      <div
        className="product-swatch"
        style={{ background: `linear-gradient(150deg, ${p.tone}, #FDEAF0)` }}
      >
        <span className="swatch-ring" />
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
