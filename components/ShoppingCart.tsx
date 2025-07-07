import React from "react";
import { useCart } from "./CartContext";

const ShoppingCart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    isCartOpen, 
    toggleCart 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="minimalist-modal-backdrop" onClick={toggleCart} />
      
      {/* Modal */}
      <div className="minimalist-modal">
        <div className="minimalist-modal-header">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="minimalist-modal-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Shopping Cart
            </h2>
            <button className="minimalist-modal-close" onClick={toggleCart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="minimalist-modal-body">
          {items.length === 0 ? (
            <div className="minimalist-empty-cart">
              <div className="minimalist-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>
                Your cart is empty
              </h3>
              <p style={{ color: '#737373', fontSize: '0.875rem' }}>
                Add some cocktails to get started!
              </p>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <div key={item.id} className="minimalist-cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="minimalist-cart-image"
                  />
                  <div className="minimalist-cart-details">
                    <h4 className="minimalist-cart-name">{item.name}</h4>
                    <div className="minimalist-cart-price">${item.price}</div>
                    <div className="minimalist-cart-controls">
                      <button
                        className="minimalist-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                      <span className="minimalist-quantity">{item.quantity}</span>
                      <button
                        className="minimalist-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                      <button
                        className="minimalist-quantity-btn minimalist-remove-btn ms-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="minimalist-modal-footer">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                Total:
              </h3>
              <div className="minimalist-price" style={{ fontSize: '2rem' }}>
                ${getTotalPrice().toFixed(2)}
              </div>
            </div>
            <div className="d-grid gap-3">
              <button className="minimalist-btn minimalist-btn-gold" style={{ padding: '1rem' }}>
                Proceed to Checkout
              </button>
              <button className="minimalist-btn minimalist-btn-secondary" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;