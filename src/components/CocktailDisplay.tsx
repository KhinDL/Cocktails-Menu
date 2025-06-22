// components/CocktailDisplay/CocktailDisplay.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  fetchCocktailsByCategory,
  CategoryCocktail,
} from "../api/TheCocktailDB/cocktailApi";
import DetailView from "./DetailView";

interface CocktailDisplayProps {
  category: string | null;
}

const CocktailDisplay: React.FC<CocktailDisplayProps> = ({ category }) => {
  const [cocktails, setCocktails] = useState<CategoryCocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <DetailView
      cocktails={cocktails}
      category={category}
      isLoading={loading}
      error={error}
    />
  );
};

export default CocktailDisplay;
