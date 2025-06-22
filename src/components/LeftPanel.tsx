// LeftPanel.tsx
import React from "react";
import { useTheme } from "./ThemeContext";

interface LeftPanelProps {
  items: string[];
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  items,
  selectedItem,
  onSelectItem,
}) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: theme === "light" ? "#f8f9fa" : "#343a40",
        color: theme === "light" ? "#212529" : "#fff",
        borderRight:
          theme === "light" ? "1px solid #dee2e6" : "rgba(222, 226, 230, 0.48)",
        overflowY: "auto",
        padding: "1rem",
      }}
    >
      <ul className="list-group">
        {items.map((cat) => {
          const isSelected = cat === selectedItem;
          return (
            <li
              key={cat}
              className={`list-group-item ${isSelected ? "active" : ""} ${
                theme === "dark" ? "bg-dark text-light" : ""
              }`}
              style={{
                cursor: "pointer",
                borderColor: "rgba(222, 226, 230, 0.48)",
              }}
              onClick={() => onSelectItem(cat)}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftPanel;
