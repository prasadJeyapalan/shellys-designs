import React from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Nav({ page, setPage, menuOpen, setMenuOpen }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="brand" onClick={() => setPage("home")}>
          <span className="brand-mark">SD</span>
          <span className="brand-name script">Shelly's Signature Designs</span>
        </button>
        <nav className="nav-links">
          {links.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${page === l.id ? "active" : ""}`}
              onClick={() => setPage(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button className="nav-icon-btn" aria-label="Bag">
          <ShoppingBag size={18} />
        </button>
        <button className="menu-toggle" aria-label="Menu" onClick={() => setMenuOpen((m) => !m)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${page === l.id ? "active" : ""}`}
              onClick={() => {
                setPage(l.id);
                setMenuOpen(false);
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
