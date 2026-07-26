import React from "react";
import { Sparkles } from "lucide-react";

const STEPS = [
  { label: "You dream it", body: "Send a name, phrase, or idea — or pick from our ready-made designs." },
  { label: "We design it", body: "A quick proof comes back to you before anything ever gets pressed." },
  { label: "We print it", body: "Heat transfer, vinyl, or embroidery — whatever suits the piece best." },
  { label: "You love it", body: "Packed with care and shipped, usually within a week." },
];

export default function Process() {
  return (
    <section className="section process">
      <span className="eyebrow">
        <Sparkles size={13} /> How it works
      </span>
      <h2 className="font-display">From idea to iron-on</h2>
      <div className="process-grid">
        {STEPS.map((s, i) => (
          <div className="process-step" key={s.label}>
            <span className="step-num script">{i + 1}</span>
            <h4 className="font-display">{s.label}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
