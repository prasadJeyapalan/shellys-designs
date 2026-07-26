import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA({ setPage }) {
  return (
    <section className="cta">
      <h2 className="font-display">Got an idea? Let's put it on something.</h2>
      <button className="btn-primary" onClick={() => setPage("shop")}>
        Start shopping <ArrowRight size={16} />
      </button>
    </section>
  );
}
