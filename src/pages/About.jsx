import React from "react";
import { Sparkles } from "lucide-react";
import { SectionDivider } from "../components/Decor.jsx";

export default function About() {
  return (
    <section className="section about-page">
      <span className="eyebrow">
        <Sparkles size={13} /> Hi, I'm Shelly
      </span>
      <h2 className="font-display">A little shop with a lot of heart</h2>
      <div className="about-grid">
        <p>
          Shelly's Signature Designs started at my kitchen table with one heat
          press and a stack of blank tees. A few years and a lot of orders
          later, every piece is still designed, pressed, and packed by hand —
          just with a bigger table now.
        </p>
        <p>
          Whether it's a name on a onesie, a matching set for game day, or
          merch for your small business, I treat every order like it's going
          to someone I know. Because usually, it kind of is.
        </p>
      </div>
      <SectionDivider />
      <div className="about-stats">
        <div>
          <span className="font-display stat-num">2K+</span>
          <span className="stat-label">Orders shipped</span>
        </div>
        <div>
          <span className="font-display stat-num">100%</span>
          <span className="stat-label">Hand-pressed</span>
        </div>
        <div>
          <span className="font-display stat-num">5★</span>
          <span className="stat-label">Average rating</span>
        </div>
      </div>
    </section>
  );
}
