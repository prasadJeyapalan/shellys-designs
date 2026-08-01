import React, { useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { PRODUCTS } from "../data/products.js";

export default function CartDrawer({ cart, onClose, onChangeQty, onRemove }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const items = cart
    .map((line) => {
      const product = PRODUCTS.find((p) => p.id === line.id);
      return product ? { ...product, qty: line.qty, size: line.size } : null;
    })
    .filter(Boolean);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
  name: i.size ? `${i.name} (Size ${i.size})` : i.name,
  price: i.price,
  qty: i.qty,
})),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Checkout failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [showCashForm, setShowCashForm] = useState(false);
  const [cashName, setCashName] = useState("");
  const [cashPhone, setCashPhone] = useState("");
  const [cashTime, setCashTime] = useState("");
  const [cashSent, setCashSent] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);

  const handleCashSubmit = async (e) => {
    e.preventDefault();
    setCashLoading(true);
    try {
      const res = await fetch("/api/send-cash-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
  name: i.size ? `${i.name} (Size ${i.size})` : i.name,
  price: i.price,
  qty: i.qty,
})),
          total,
          name: cashName,
          phone: cashPhone,
          pickupTime: cashTime,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCashSent(true);
      } else {
        throw new Error(data.error || "Failed to send");
      }
    } catch (err) {
      setError("Couldn't send your request. Please try again.");
      console.error(err);
    } finally {
      setCashLoading(false);
    }
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3 className="font-display">Your Bag</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div
                    className="cart-item-swatch"
                    style={{ background: `linear-gradient(150deg, ${item.tone}, #FDEAF0)` }}
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-row">
                      <h4 className="font-display">
                        {item.name}
                        {item.size && <span className="cart-item-size"> — Size {item.size}</span>}
                      </h4>
                      <button
                        className="cart-remove"
                        onClick={() => onRemove(item.id, item.size)}
                        aria-label="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="price">${item.price}</p>
                    <div className="qty-control">
                      <button onClick={() => onChangeQty(item.id, item.size,item.qty - 1)} aria-label="Decrease">
                        <Minus size={12} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => onChangeQty(item.id, item.size, item.qty + 1)} aria-label="Increase">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span className="price large">${total}</span>
              </div>
              {error && <p className="cart-error">{error}</p>}
              <button
                className="btn-primary cart-checkout"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Redirecting…" : "Pay by card"}
              </button>
              {!showCashForm && !cashSent && (
                <button className="btn-ghost cart-cash" onClick={() => setShowCashForm(true)}>
                  Reserve & pay cash at pickup
                </button>
              )}

              {showCashForm && !cashSent && (
                <form className="cash-form" onSubmit={handleCashSubmit}>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={cashName}
                    onChange={(e) => setCashName(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={cashPhone}
                    onChange={(e) => setCashPhone(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Preferred pickup time"
                    required
                    value={cashTime}
                    onChange={(e) => setCashTime(e.target.value)}
                  />
                  <button className="btn-ghost cart-cash" type="submit" disabled={cashLoading}>
                    {cashLoading ? "Sending…" : "Confirm reservation"}
                  </button>
                </form>
              )}

              {cashSent && (
                <p className="cash-confirmation">
                  Reserved! We'll text or call you to confirm pickup.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
