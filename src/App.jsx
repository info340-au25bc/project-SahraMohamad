import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ref, set, onValue } from 'firebase/database';
import { database } from './config/firebase';
import { useAuth } from './context/AuthContext';
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
  const { activeUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!activeUser) {
      setFavorites([]);
      return;
    }

    const favoritesRef = ref(database, `users/${activeUser.email.replace(/\./g, '_')}/favorites`);
    
    const unsubscribe = onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      setFavorites(data ? Object.values(data) : []);
    }, (error) => {
      console.error("Error reading favorites:", error);
      setFavorites([]);
    });

    return () => unsubscribe();
  }, [activeUser]);

  const addFavorite = async (recipe) => {
    if (!activeUser) {
      alert("Please sign in to save favorites");
      return;
    }
    
    if (favorites.find(fav => fav.id === recipe.id)) return;

    const newFavorites = [...favorites, recipe];
    const favoritesRef = ref(database, `users/${activeUser.email.replace(/\./g, '_')}/favorites`);
    
    try {
      await set(favoritesRef, newFavorites);
    } catch (error) {
      console.error("Error saving favorite:", error);
      alert("Failed to save favorite. Please try again.");
    }
  };

  const removeFavorite = async (id) => {
    if (!activeUser) return;

    const newFavorites = favorites.filter(recipe => recipe.id !== id);
    const favoritesRef = ref(database, `users/${activeUser.email.replace(/\./g, '_')}/favorites`);
    
    try {
      await set(favoritesRef, newFavorites);
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove favorite. Please try again.");
    }
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
