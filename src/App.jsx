import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/homepage.jsx";
import FridgePage from "./pages/FridgePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import Favorites from "./pages/MyMeals.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "../css/app.css";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fridge" element={<FridgePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/favorites" element={<MyMeals />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
