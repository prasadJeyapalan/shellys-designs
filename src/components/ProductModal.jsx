import React, { useState } from "react";
import { X } from "lucide-react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [added, setAdded] = useState(false);
  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product.id);
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
          <div className="modal-footer">
            <span className="price large">${product.price}</span>
            <button className="btn-primary" onClick={handleAdd}>
              {added ? "Added ✓" : "Add to bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
