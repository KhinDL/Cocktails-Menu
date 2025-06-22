// components/CategorySelector/CategorySelector.tsx
import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/TheCocktailDB/cocktailApi";
import LeftPanel from "./LeftPanel";

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
    return <p style={{ padding: "1rem" }}>Loading categories...</p>;
  }

  if (error) {
    return <p style={{ padding: "1rem", color: "red" }}>{error}</p>;
  }

  return (
    <LeftPanel
      items={categories}
      selectedItem={selectedCategory}
      onSelectItem={onSelectCategory}
    />
  );
};

export default CategorySelector;
