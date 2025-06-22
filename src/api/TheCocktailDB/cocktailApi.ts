// services/cocktailApi.ts

// Basic interface for partial cocktail data from filter.php
export interface CategoryCocktail {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

// Fetch all categories (e.g. "Ordinary Drink", "Cocktail", etc.)
export async function fetchCategories(): Promise<string[]> {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response error: ${response.statusText}`);
    }
    const data = await response.json();
    // data.drinks is an array of objects like [{ strCategory: "Ordinary Drink" }, ...]
    if (!data.drinks || !Array.isArray(data.drinks)) {
      return [];
    }
    // Extract the category names
    return data.drinks.map((item: any) => item.strCategory);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch cocktails for a chosen category using filter.php
export async function fetchCocktailsByCategory(
  category: string
): Promise<CategoryCocktail[]> {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
    category
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response error: ${response.statusText}`);
    }
    const data = await response.json();
    // data.drinks is an array of partial cocktail data (idDrink, strDrink, strDrinkThumb)
    if (!data.drinks || !Array.isArray(data.drinks)) {
      return [];
    }
    return data.drinks;
  } catch (error) {
    console.error("Error fetching cocktails by category:", error);
    return [];
  }
}
