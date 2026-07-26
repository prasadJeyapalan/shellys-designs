import React from "react";

export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="brand-name script">Shelly's Signature Designs</span>
        <div className="footer-links">
          <button onClick={() => setPage("shop")}>Shop</button>
          <button onClick={() => setPage("about")}>About</button>
          <button onClick={() => setPage("contact")}>Contact</button>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Shelly's Signature Designs</span>
      </div>
    </footer>
  );
}
