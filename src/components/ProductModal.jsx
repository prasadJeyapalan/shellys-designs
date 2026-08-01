import React, { useState } from "react";
import { X } from "lucide-react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState(null);

  if (!product) return null;

  const needsSize = product.sizes && product.sizes.length > 0;

  const handleAdd = () => {
    if (needsSize && !size) return;
    onAddToCart(product.id, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div
          className="modal-swatch"
          style={{
            background: product.image
              ? `url(${product.image}) center/cover no-repeat`
              : `linear-gradient(150deg, ${product.tone}, #FDEAF0)`,
          }}
        >
          {!product.image && <span className="swatch-ring large" />}
        </div>
        <div className="modal-info">
          <span className="eyebrow">{product.cat[0].toUpperCase() + product.cat.slice(1)}</span>
          <h3 className="font-display">{product.name}</h3>
          <p className="note">{product.note}</p>

          {needsSize && (
            <div className="size-picker">
              <span className="size-label">Size</span>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="modal-footer">
            <span className="price large">${product.price}</span>
            <button
              className="btn-primary"
              onClick={handleAdd}
              disabled={needsSize && !size}
            >
              {added ? "Added ✓" : needsSize && !size ? "Select a size" : "Add to bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}