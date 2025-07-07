import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/TheCocktailDB/cocktailApi";

interface CategorySelectorProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((cats) => {
        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="minimalist-loading">
        <div className="minimalist-spinner"></div>
        <span style={{ color: '#737373', fontSize: '0.875rem' }}>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="minimalist-alert minimalist-alert-warning">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          className={`minimalist-category-item ${
            category === selectedCategory ? "active" : ""
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;