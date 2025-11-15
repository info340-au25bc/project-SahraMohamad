export default function RecipeCard({ recipe, onFavorite }) {
  return (
    <div className="card">
      <div className="card-image"></div>
      <div className="card-footer">
        <div>
          <h3>{recipe.name}</h3>
          <p>{recipe.type} • {recipe.calories} cal</p>
        </div>
        <div className="tags">
          <span className="tag">{recipe.type}</span>
        </div>
        {onFavorite && (
          <button className="chip" onClick={() => onFavorite(recipe)}>
            ♥ Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
}
