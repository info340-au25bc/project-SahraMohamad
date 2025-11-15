import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Alfredo Pasta", type: "Dinner", calories: 600 },
    { id: 2, name: "Toasted Bagel (Cinny & Pear)", type: "Breakfast", calories: 400 },
    { id: 3, name: "Poke Bowl", type: "Lunch", calories: 700 }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id));
  };

  const filteredRecipes = favorites.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || recipe.type === filterType;
    return matchesSearch && matchesType;
  });


  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'calories') return a.calories - b.calories;
    return 0;
  });

  return (
    <main className="explore-page">
      <section className="container">
        <h1>My Favorites</h1>
        
        {/* Interactive Search Bar */}
        <div id="search">
          <input
            type="text"
            placeholder="🔍 Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{border: 'none', outline: 'none', width: '100%', background: 'transparent'}}
          />
        </div>

        
        <div style={{display: 'flex', gap: '20px', margin: '20px 0'}}>
          <div>
            <label>Filter by type: </label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
          
          <div>
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="calories">Calories</option>
            </select>
          </div>
        </div>

        <div className="explore-grid">
          {sortedRecipes.length > 0 ? (
            sortedRecipes.map((recipe) => (
              <div key={recipe.id} className="card">
                <div className="card-image"></div>
                <div className="card-footer">
                  <div>
                    <h3>{recipe.name}</h3>
                    <p>{recipe.type} • {recipe.calories} cal</p>
                  </div>
                  <div className="tags">
                    <span className="tag">{recipe.type}</span>
                  </div>
                  <button className="chip" onClick={() => removeFavorite(recipe.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No favorites found. Try adjusting your search or filter!</p>
          )}
        </div>
      </section>
    </main>
  );
}
