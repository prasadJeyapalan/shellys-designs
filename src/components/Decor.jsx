import React from "react";
import { Heart } from "lucide-react";

export function HeartBullet({ size = 14, color = "#E85D8C" }) {
  return <Heart size={size} color={color} fill={color} style={{ display: "inline-block" }} />;
}

export function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="divider-line" />
      <HeartBullet size={12} />
      <span className="divider-line" />
    </div>
  );
}
