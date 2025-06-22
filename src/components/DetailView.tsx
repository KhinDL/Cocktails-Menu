// DetailView.tsx
import React from "react";
import { useTheme } from "./ThemeContext";
import { CategoryCocktail } from "../api/TheCocktailDB/cocktailApi";

interface DetailViewProps {
  cocktails: CategoryCocktail[];
  category: string | null;
  isLoading: boolean;
  error: string;
}

const DetailView: React.FC<DetailViewProps> = ({
  cocktails,
  category,
  isLoading,
  error,
}) => {
  const { theme } = useTheme();

  if (!category) {
    return (
      <div style={{ padding: "1rem" }}>
        <p>Please select a category from the left panel.</p>
      </div>
    );
  }

  // If we have an error, show it in the detail area
  if (error) {
    return (
      <div style={{ padding: "1rem", color: "red" }}>
        <h1>{category}</h1>
        <p>{error}</p>
      </div>
    );
  }

  // If cocktails are loading, show a loading message in the detail area only
  if (isLoading) {
    return (
      <div style={{ padding: "1rem" }}>
        <h1>{category}</h1>
        <p>Loading cocktails...</p>
      </div>
    );
  }

  // Otherwise, display the cocktails
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: theme === "light" ? "#fff" : "#444",
        color: theme === "light" ? "#212529" : "#fff",
      }}
    >
      <h1>{category}</h1>
      {cocktails.length === 0 ? (
        <p>No cocktails found for this category.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {cocktails.map((drink) => (
            <div
              key={drink.idDrink}
              style={{
                width: "150px",
                backgroundColor: theme === "dark" ? "#555" : "#f8f9fa",
                borderRadius: "8px",
                overflow: "hidden",
                textAlign: "center",
                padding: "0.5rem",
              }}
            >
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                style={{ width: "100%", height: "auto" }}
              />
              <h5 style={{ marginTop: "0.5rem" }}>{drink.strDrink}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailView;
