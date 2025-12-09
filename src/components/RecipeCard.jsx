import { FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';

export default function RecipeCard({ recipe, onFavorite, onRemoveFavorite, isFavorited }) {
  const imageLabel = recipe.image
    ? `${recipe.name} plated`
    : `${recipe.name} placeholder`;

  const handleClick = () => {
    if (isFavorited && onRemoveFavorite) {
      onRemoveFavorite(recipe.id);
    } else if (onFavorite) {
      onFavorite(recipe);
    }
  };

  return (
    <div className="card">
      <div className="card-image" role="img" aria-label={imageLabel}>
        {recipe.image ? (
          <img src={recipe.image} alt={imageLabel} loading="lazy" />
        ) : (
          <span className="card-placeholder">Meal idea</span>
        )}
      </div>
      <div className="card-footer">
        <div className="card-info">
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
        {(onFavorite || onRemoveFavorite) && (
          <button 
            className="chip" 
            onClick={handleClick}
          >
            {isFavorited ? <><FaHeart /> Remove</> : <><FaPlus /> Add to My Meals</>}
          </button>
        )}
      </div>
    </div>
  );
}
