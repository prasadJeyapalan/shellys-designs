import React, { useState } from "react";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { HeartBullet } from "../components/Decor.jsx";

export default function Shop({ onSelect }) {
  const [filter, setFilter] = useState("all");
  const shown = PRODUCTS.filter((p) => filter === "all" || p.cat === filter);

  return (
    <section className="section shop-page">
      <div className="section-head">
        <div>
          <span className="eyebrow">
            <HeartBullet /> The full shop
          </span>
          <h2 className="font-display">Shirts, hats &amp; drinkware</h2>
        </div>
        <div className="filter-row">
          {["all", "shirts", "hats", "drinkware"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-4">
        {shown.map((p) => (
          <ProductCard key={p.id} p={p} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
