import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/homepage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "./style.css";


export default function App() {
 return (
   <Router>
     <div>
       <nav className="main-nav">
         <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/explore">Explore</Link></li>
           <li><Link to="/login">Sign In</Link></li>
         </ul>
       </nav>


       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/explore" element={<ExplorePage />} />
         <Route path="/login" element={<LoginPage />} />
       </Routes>
     </div>
   </Router>
 );
}
