import React, { useEffect, useRef, useState } from "react";
import {
  fetchCocktailsByCategory,
  CategoryCocktail,
} from "../api/TheCocktailDB/cocktailApi";
import { useCart } from "./CartContext";

interface CocktailDisplayProps {
  category: string | null;
}

const CocktailDisplay: React.FC<CocktailDisplayProps> = ({ category }) => {
  const [cocktails, setCocktails] = useState<CategoryCocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  // Simple in-memory cache: { [categoryName]: CategoryCocktail[] }
  const cacheRef = useRef<Record<string, CategoryCocktail[]>>({});

  useEffect(() => {
    // If no category is selected, clear out cocktails
    if (!category) {
      setCocktails([]);
      setError("");
      return;
    }

    // Check cache
    if (cacheRef.current[category]) {
      // Found in cache, skip fetch
      setCocktails(cacheRef.current[category]);
      setError("");
      return;
    }

    // Fetch from API
    setLoading(true);
    setError("");
    fetchCocktailsByCategory(category)
      .then((drinks) => {
        setCocktails(drinks);
        cacheRef.current[category] = drinks; // store in cache
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load cocktails for this category.");
        setLoading(false);
      });
  }, [category]);

  // Generate a realistic price for display purposes
  const generatePrice = (name: string): string => {
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const price = 12 + (Math.abs(hash) % 8); // Price between $12-19
    return `$${price}`;
  };

  const handleAddToCart = (drink: CategoryCocktail) => {
    const price = parseInt(generatePrice(drink.strDrink).replace('$', ''));
    addToCart({
      id: drink.idDrink,
      name: drink.strDrink,
      price: price,
      image: drink.strDrinkThumb
    });
  };

  if (!category) {
    return (
      <div className="minimalist-welcome">
        <div className="minimalist-welcome-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12V7a5 5 0 0 1 10 0v5"/>
            <rect x="3" y="12" width="18" height="8" rx="2"/>
            <path d="M8 16h8"/>
          </svg>
        </div>
        <h1 className="minimalist-welcome-title">
          Discover Our<br />
          Signature Collection
        </h1>
        <p className="minimalist-welcome-subtitle">
          Select a category to explore our carefully curated selection of premium cocktails, 
          each crafted with the finest ingredients and expert precision.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="minimalist-section-header">
          <h2 className="minimalist-section-title">{category}</h2>
          <div className="minimalist-section-accent"></div>
        </div>
        <div className="minimalist-alert minimalist-alert-warning">
          <strong>Oops!</strong> {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="minimalist-section-header">
          <h2 className="minimalist-section-title">{category}</h2>
          <div className="minimalist-section-accent"></div>
        </div>
        <div className="minimalist-loading">
          <div className="minimalist-spinner"></div>
          <span style={{ color: '#737373' }}>Curating your selection...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="minimalist-section-header">
        <h2 className="minimalist-section-title">{category}</h2>
        <div className="minimalist-section-accent"></div>
      </div>
      
      {cocktails.length === 0 ? (
        <div className="minimalist-alert minimalist-alert-info">
          No cocktails available in this category.
        </div>
      ) : (
        <div className="minimalist-grid">
          {cocktails.map((drink) => (
            <div key={drink.idDrink} className="minimalist-card">
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="minimalist-card-image"
              />
              <div className="minimalist-card-content">
                <h3 className="minimalist-card-title">{drink.strDrink}</h3>
                <div className="minimalist-card-footer">
                  <span className="minimalist-price">
                    {generatePrice(drink.strDrink)}
                  </span>
                  <button 
                    className="minimalist-btn minimalist-btn-primary"
                    onClick={() => handleAddToCart(drink)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CocktailDisplay;