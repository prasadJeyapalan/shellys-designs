import React, { useState } from "react";
import "./styles.css";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [cartOpen, setCartOpen] = useState(false);

const addToCart = (id, size = null) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === id && line.size === size);
      if (existing) {
        return prev.map((line) =>
          line === existing ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { id, size, qty: 1 }];
    });
  };

const changeQty = (id, size, qty) => {
    if (qty < 1) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((line) => (line.id === id && line.size === size ? { ...line, qty } : line))
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((line) => !(line.id === id && line.size === size)));
  };
  
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  return (
    <div className="app">
      <Nav
        page={page}
        setPage={setPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

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

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
}
