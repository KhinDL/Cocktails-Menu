// App.tsx
import React, { useState } from "react";
import CategorySelector from "./components/CategorySelector";
import CocktailDisplay from "./components/CocktailDisplay";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeContext";

const App: React.FC = () => {
  // The only state in App: which category is selected
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ThemeProvider>
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        {/* LEFT COLUMN: CategorySelector */}
        <div style={{ width: "20%" }}>
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* RIGHT COLUMN: Header on top + CocktailDisplay below */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "1rem",
          }}
        >
          <Header title="Cocktails by Category" showThemeToggle />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <CocktailDisplay category={selectedCategory} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
