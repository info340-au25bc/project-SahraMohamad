import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/homepage.jsx";
import FridgePage from "./pages/FridgePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import MyMeals from "./pages/MyMeals.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FridgeItemDetail from "./pages/FridgeItemDetail.jsx";
import "../css/app.css";

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('mealPlannerFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mealPlannerFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe) => {
    if (!favorites.find(fav => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id));
  };

  return (
    <Router>
      <div className="app-shell">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fridge" element={<FridgePage />} />
            <Route path="/fridge-items/:slug" element={<FridgeItemDetail />} />
            <Route path="/explore" element={<ExplorePage addFavorite={addFavorite} favorites={favorites} />} />
            <Route path="/favorites" element={<MyMeals favorites={favorites} removeFavorite={removeFavorite} />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
