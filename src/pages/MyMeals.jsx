import { useState } from 'react';


export default function MyMeals() {
 const [meals, setMeals] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [filterType, setFilterType] = useState('All');
 const [sortBy, setSortBy] = useState('name');
 const [showForm, setShowForm] = useState(false);
  const [newMeal, setNewMeal] = useState({
   name: '',
   type: 'Breakfast',
   calories: '',
   tags: ''
 });


 const handleAddMeal = (e) => {
   e.preventDefault();
  
   if (!newMeal.name.trim()) return;


   const meal = {
     id: Date.now(),
     name: newMeal.name.trim(),
     type: newMeal.type,
     calories: newMeal.calories ? parseInt(newMeal.calories) : null,
     tags: newMeal.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
     image: null
   };


   setMeals([...meals, meal]);
   setNewMeal({ name: '', type: 'Breakfast', calories: '', tags: '' });
   setShowForm(false);
 };


 const removeMeal = (id) => {
   setMeals(meals.filter(meal => meal.id !== id));
 };


 const filteredMeals = meals.filter(meal => {
   const searchLower = searchTerm.toLowerCase();
   const matchesSearch = searchTerm === '' ||
     meal.name.toLowerCase().includes(searchLower) ||
     meal.type.toLowerCase().includes(searchLower) ||
     (meal.tags && meal.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
     (meal.calories && meal.calories.toString().includes(searchTerm));
   const matchesType = filterType === 'All' || meal.type === filterType;
   return matchesSearch && matchesType;
 });


 const sortedMeals = [...filteredMeals].sort((a, b) => {
   if (sortBy === 'name') return a.name.localeCompare(b.name);
   if (sortBy === 'calories') return (a.calories || 0) - (b.calories || 0);
   return 0;
 });


 return (
   <div className="explore-body">
     <div id="search">
       <label htmlFor="meals-search">🔍 Search your meals</label>
       <input
         id="meals-search"
         type="search"
         placeholder='Try "pasta", "breakfast", or "healthy"'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
       />
     </div>


     <main className="explore-page">
       <section className="container">
         <div className="meals-header">
           <div className="meals-header-info">
             <h1>My Meals</h1>
             <p className="search-meta">
               {meals.length === 0 ? 'No meals yet' : `${sortedMeals.length} meal${sortedMeals.length === 1 ? '' : 's'}`}
             </p>
           </div>
           <button
             className="chip"
             onClick={() => setShowForm(!showForm)}
           >
             {showForm ? 'Cancel' : '+ Add New Meal'}
           </button>
         </div>


         {showForm && (
           <form onSubmit={handleAddMeal} className="meal-form">
             <h2>Create a New Meal</h2>
            
             <div className="form-field">
               <label htmlFor="meal-name">
                 Meal Name *
               </label>
               <input
                 id="meal-name"
                 type="text"
                 required
                 placeholder="e.g., Chicken Salad"
                 value={newMeal.name}
                 onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
               />
             </div>


             <div className="form-field">
               <label htmlFor="meal-type">
                 Meal Type
               </label>
               <select
                 id="meal-type"
                 value={newMeal.type}
                 onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
               >
                 <option value="Breakfast">Breakfast</option>
                 <option value="Lunch">Lunch</option>
                 <option value="Dinner">Dinner</option>
                 <option value="Snack">Snack</option>
               </select>
             </div>


             <div className="form-field">
               <label htmlFor="meal-calories">
                 Calories (optional)
               </label>
               <input
                 id="meal-calories"
                 type="number"
                 placeholder="e.g., 450"
                 value={newMeal.calories}
                 onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
               />
             </div>


             <div className="form-field">
               <label htmlFor="meal-tags">
                 Tags (comma-separated, optional)
               </label>
               <input
                 id="meal-tags"
                 type="text"
                 placeholder="e.g., Healthy, Quick, Vegan"
                 value={newMeal.tags}
                 onChange={(e) => setNewMeal({ ...newMeal, tags: e.target.value })}
               />
             </div>


             <button type="submit" className="chip">
               Save Meal
             </button>
           </form>
         )}


         <div className="filter-controls">
           <div className="filter-group">
             <label htmlFor="meals-type-filter">
               Filter by type
             </label>
             <select
               id="meals-type-filter"
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
             >
               <option value="All">All</option>
               <option value="Breakfast">Breakfast</option>
               <option value="Lunch">Lunch</option>
               <option value="Dinner">Dinner</option>
               <option value="Snack">Snack</option>
             </select>
           </div>
          
           <div className="filter-group">
             <label htmlFor="meals-sort">
               Sort by
             </label>
             <select
               id="meals-sort"
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
             >
               <option value="name">Name</option>
               <option value="calories">Calories</option>
             </select>
           </div>
         </div>


         {sortedMeals.length > 0 ? (
           <div className="explore-grid">
             {sortedMeals.map((meal) => (
               <div key={meal.id} className="card">
                 <div
                   className="card-image"
                   role="img"
                   aria-label={`${meal.name} placeholder`}
                 >
                   <span className="card-placeholder">My Meal</span>
                 </div>
                 <div className="card-footer">
                   <div>
                     <h3>{meal.name}</h3>
                     <p>
                       {meal.type}
                       {meal.calories ? ` • ${meal.calories} cal` : ''}
                     </p>
                   </div>
                   <div className="tags">
                     {meal.tags && meal.tags.length > 0 ? (
                       meal.tags.map((tag) => (
                         <span key={tag} className="tag">{tag}</span>
                       ))
                     ) : (
                       <span className="tag">{meal.type}</span>
                     )}
                   </div>
                   <button className="chip" onClick={() => removeMeal(meal.id)}>
                     Remove
                   </button>
                 </div>
               </div>
             ))}
           </div>
         ) : meals.length === 0 ? (
           <div className="empty-results">
             <p>You haven't added any meals yet. Click "Add New Meal" to get started!</p>
           </div>
         ) : (
           <div className="empty-results">
             <p>No meals match your filters. Try adjusting your search!</p>
             <button
               className="chip"
               type="button"
               onClick={() => {
                 setSearchTerm('');
                 setFilterType('All');
               }}
             >
               Clear filters
             </button>
           </div>
         )}
       </section>
     </main>
   </div>
 );
}

