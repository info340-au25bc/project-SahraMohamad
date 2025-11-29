const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

const getCalories = (nutrition) => {
  if (!nutrition?.nutrients) {
    return null;
  }

  const calorieEntry = nutrition.nutrients.find(
    (nutrient) => nutrient.name === "Calories"
  );
  return calorieEntry ? Math.round(calorieEntry.amount) : null;
};

const buildTags = (recipe) => {
  const categories = [
    ...(recipe.dishTypes ?? []),
    ...(recipe.diets ?? []),
    ...(recipe.cuisines ?? []),
  ];

  if (recipe.readyInMinutes) {
    categories.push(`${recipe.readyInMinutes} min`);
  }

  return Array.from(new Set(categories))
    .filter(Boolean)
    .slice(0, 4);
};

export async function fetchRecipesFromSpoonacular(query, { signal } = {}) {
  if (!SPOONACULAR_API_KEY) {
    throw new Error("Missing Spoonacular API key.");
  }

  const searchTerm = query?.trim() || "popular";
  const params = new URLSearchParams({
    query: searchTerm,
    number: "8",
    addRecipeNutrition: "true",
    instructionsRequired: "true",
    sort: searchTerm === "popular" ? "popularity" : "relevance",
  });
  params.append("apiKey", SPOONACULAR_API_KEY);

  const response = await fetch(`${BASE_URL}?${params.toString()}`, { signal });
  if (!response.ok) {
    throw new Error("Unable to fetch recipes right now.");
  }

  const data = await response.json();
  const results = data.results ?? [];

  return results.map((recipe) => ({
    id: recipe.id,
    name: recipe.title,
    type: recipe.dishTypes?.[0] ?? "Meal",
    calories: getCalories(recipe.nutrition),
    tags: buildTags(recipe),
    image: recipe.image,
    sourceUrl: recipe.sourceUrl,
  }));
}
