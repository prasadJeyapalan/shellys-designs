import React from "react";
import { ArrowRight, Sparkles, Shirt, Crown, Coffee } from "lucide-react";

export default function Hero({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="eyebrow">
          <Sparkles size={13} /> Made to order, stitched with love
        </span>
        <h1 className="hero-title font-display">
          Custom apparel that feels
          <br />
          <span className="script accent-script">like you</span>
        </h1>
        <p className="hero-sub">
          Heat-pressed tees, embroidered caps, and signature drinkware — every
          piece designed and printed by hand, just for you.
        </p>


        <div className="hero-actions">
          <button className="btn-primary" onClick={() => setPage("shop")}>
            Shop the shop <ArrowRight size={16} />
          </button>
          <button className="btn-ghost" onClick={() => setPage("about")}>
            Our story
          </button>
        </div>

        <div className="hero-categories">
  <button className="hero-cat" onClick={() => setPage("shop")}>
    <Shirt size={22} />
    <span>Shirts</span>
  </button>
  <button className="hero-cat" onClick={() => setPage("shop")}>
    <Crown size={22} />
    <span>Hats</span>
  </button>
  <button className="hero-cat" onClick={() => setPage("shop")}>
    <Coffee size={22} />
    <span>Drinkware</span>
  </button>
</div>
      </div>
      <div className="hero-ring" aria-hidden="true" />
    </section>
  );
}
