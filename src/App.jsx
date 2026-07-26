import React, { useState } from "react";
import "./styles.css";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import ProductModal from "./components/ProductModal.jsx";

import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]); // [{ id, qty }]

  const addToCart = (id) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) =>
          line.id === id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  return (
    <div className="app">
      <Nav page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {page === "home" && <Home setPage={setPage} onSelect={setSelected} />}
      {page === "shop" && <Shop onSelect={setSelected} />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}

      <Footer setPage={setPage} />

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
