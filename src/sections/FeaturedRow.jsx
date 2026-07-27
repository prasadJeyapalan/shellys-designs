import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { HeartBullet } from "../components/Decor.jsx";

export default function FeaturedRow({ setPage, onSelect }) {
  const featured = PRODUCTS.filter((p) => p.available);
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="eyebrow">
            <HeartBullet /> Fan favorites
          </span>
          <h2 className="font-display">What everyone's ordering</h2>
        </div>
        <button className="link-more" onClick={() => setPage("shop")}>
          See the full shop <ArrowUpRight size={14} />
        </button>
      </div>
      <div className="grid grid-3">
        {featured.map((p) => (
          <ProductCard key={p.id} p={p} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
