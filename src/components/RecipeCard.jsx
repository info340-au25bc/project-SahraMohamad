import { FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';

export default function RecipeCard({ recipe, onFavorite, isFavorited }) {
  const backgroundStyle = recipe.image
    ? {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0,0,0,.35)), url(${recipe.image})`,
      }
    : undefined;
  const imageLabel = recipe.image
    ? `${recipe.name} plated`
    : `${recipe.name} placeholder`;

  return (
    <div className="card">
      <div
        className="card-image"
        style={backgroundStyle}
        role="img"
        aria-label={imageLabel}
      >
        {!recipe.image && <span className="card-placeholder">Meal idea</span>}
      </div>
      <div className="card-footer">
        <div>
          <h3>{recipe.name}</h3>
          <p>
            {recipe.type}
            {recipe.calories ? ` • ${recipe.calories} cal` : ""}
          </p>
        </div>
        <div className="tags">
          {recipe.tags?.length ? (
            recipe.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))
          ) : (
            <span className="tag">{recipe.type}</span>
          )}
        </div>
        {onFavorite && (
          <button 
            className="chip" 
            onClick={() => onFavorite(recipe)}
            disabled={isFavorited}
          >
            {isFavorited ? <><FaHeart /> Added</> : <><FaPlus /> Add to My Meals</>}
          </button>
        )}
      </div>
    </div>
  );
}
