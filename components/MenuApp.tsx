import React, { useState } from "react";
import CategorySelector from "./CategorySelector";
import CocktailDisplay from "./CocktailDisplay";
import CartButton from "./CartButton";
import ShoppingCart from "./ShoppingCart";
import "../styles/minimalist.css";

const MenuApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }, []);

  return (
    <div className="vh-100 d-flex flex-column" style={{ backgroundColor: '#ffffff' }}>
      {/* Minimalist Header */}
      <header className="minimalist-header">
        <div className="minimalist-container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="minimalist-flex">
              <div className="minimalist-logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12V7a5 5 0 0 1 10 0v5"/>
                  <rect x="3" y="12" width="18" height="8" rx="2"/>
                </svg>
              </div>
              <div>
                <div className="minimalist-logo">COCKTAIL LOUNGE</div>
                <div className="minimalist-tagline">Premium Craft Cocktails</div>
              </div>
            </div>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="container-fluid flex-grow-1 p-0" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="row h-100 g-0">
          {/* Left Menu Sidebar */}
          <div className="col-md-3 col-lg-2">
            <div className="minimalist-sidebar overflow-hidden">
              <div className="minimalist-sidebar-header">
                <div className="minimalist-sidebar-title">Categories</div>
                <div className="minimalist-sidebar-subtitle">Select a category to explore</div>
              </div>
              <div className="minimalist-category-list">
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9 col-lg-10">
            <div className="minimalist-main">
              <CocktailDisplay category={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
      
      <ShoppingCart />
    </div>
  );
};

export default MenuApp;