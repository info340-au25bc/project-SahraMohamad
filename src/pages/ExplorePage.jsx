import RecipeCard from '../components/RecipeCard';


const recipes = [
 { id: 1, name: "Chocoloate Cake", type: "Dinner", calories: 550 },
 { id: 2, name: "Berry Smoothie", type: "Breakfast", calories: 300 },
 { id: 3, name: "Chicken Wrap", type: "Lunch", calories: 400 },
 { id: 4, name: "Steak", type: "Dinner", calories: 800 },
 { id: 5, name: "Oatmeal Bowl", type: "Breakfast", calories: 200 },
 { id: 6, name: "Hamburgers", type: "Lunch", calories: 500 }
];


export default function ExplorePage() {
 return (
   <div className="explore-body">
     <div id="search">
       <p>🔍 What are you looking for today?</p>
     </div>


     <main className="explore-page">
       <section className="container">
         <h1>Recommended Recipes</h1>
         <div className="explore-grid">
           {recipes.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe} />
           ))}
         </div>
       </section>
     </main>
   </div>
 );
}
