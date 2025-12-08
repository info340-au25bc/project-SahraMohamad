import { useEffect, useMemo, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import fallbackRecipes from '../data/fallbackRecipes.js';
import { fetchRecipesFromSpoonacular } from '../services/spoonacular.js';

const hasSpoonacularKey = Boolean(import.meta.env.VITE_SPOONACULAR_KEY);

export default function ExplorePage({ addFavorite, favorites }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [recipes, setRecipes] = useState(fallbackRecipes);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);

  const normalizedQuery = searchTerm.trim().toLowerCase();

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedTerm(searchTerm), 400);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  useEffect(() => {
    if (!hasSpoonacularKey) {
      setStatus("ready");
      setErrorMessage(null);
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setStatus("loading");
        setErrorMessage(null);
        const results = await fetchRecipesFromSpoonacular(debouncedTerm, {
          signal: controller.signal,
        });
        setRecipes(results.length ? results : fallbackRecipes);
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        setStatus("error");
        setErrorMessage(
          error.message ||
            "We couldn't reach Spoonacular. Showing saved suggestions."
        );
        setRecipes(fallbackRecipes);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [debouncedTerm]);

  const filteredRecipes = useMemo(() => {
    if (!normalizedQuery) {
      return recipes;
    }

    return recipes.filter((recipe) => {
      const searchable = [
        recipe.name,
        recipe.type,
        recipe.calories?.toString(),
        ...(recipe.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [recipes, normalizedQuery]);

  const trimmedSearch = searchTerm.trim();
  const heading = trimmedSearch
    ? `Results for “${trimmedSearch}”`
    : "Recommended Recipes";
  const meta = trimmedSearch
    ? filteredRecipes.length
      ? `Showing ${filteredRecipes.length} recipe${
          filteredRecipes.length === 1 ? "" : "s"
        } that match your search.`
      : `No recipes match “${trimmedSearch}”. Try searching for ingredients, meal types, or calories.`
    : hasSpoonacularKey
    ? "These picks come straight from Spoonacular's live recipe feed."
    : "Add a Spoonacular API key to load live recommendations.";

  return (
    <div className="explore-body">
      <div id="search">
        <label htmlFor="explore-search">🔍 What are you looking for today?</label>
        <input
          id="explore-search"
          type="search"
          placeholder='Try "vegan lunch", "pasta", or "under 400 cal"'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <main className="explore-page">
        <section className="container">
          <h1>{heading}</h1>
          <p className="search-meta">{meta}</p>
          {status === "loading" && (
            <div className="results-state" role="status" aria-live="polite">
              <p>Finding fresh ideas…</p>
            </div>
          )}
          {status === "error" && errorMessage && (
            <div className="results-state error" role="alert">
              <p>{errorMessage}</p>
            </div>
          )}

          {filteredRecipes.length > 0 ? (
            <div className="explore-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onFavorite={addFavorite}
                  isFavorited={favorites.some(fav => fav.id === recipe.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <p>Nothing came up this time. Adjust your search or clear it to see everything.</p>
              <button
                className="chip"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
