// App.tsx
import React from "react";
import MenuApp from "./components/MenuApp";
import { ThemeProvider } from "./components/ThemeContext";
import { CartProvider } from "./components/CartContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <MenuApp />
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
