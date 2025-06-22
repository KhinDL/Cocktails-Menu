import React from "react";
import { useTheme } from "./ThemeContext";

interface HeaderProps {
  title: string;
  showThemeToggle?: boolean; // Optional: Show the theme toggle button
  actions?: React.ReactNode; // Optional: Add custom actions (e.g., buttons, icons)
}

const Header: React.FC<HeaderProps> = ({
  title,
  showThemeToggle = true,
  actions,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`navbar ${
        theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
      }`}
    >
      <div className="container-fluid">
        <h1 className="navbar-brand">{title}</h1>

        <div className="d-flex align-items-center">
          {actions && <div className="me-3">{actions}</div>}

          {showThemeToggle && (
            <button className="btn btn-outline-primary" onClick={toggleTheme}>
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
