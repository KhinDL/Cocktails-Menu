import React from "react";
import { useCart } from "./CartContext";

const CartButton: React.FC = () => {
  const { getTotalItems, toggleCart } = useCart();
  const itemCount = getTotalItems();

  return (
    <button className="minimalist-cart-btn" onClick={toggleCart}>
      <div className="d-flex align-items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span>Cart</span>
      </div>
      {itemCount > 0 && (
        <span className="minimalist-cart-badge">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;