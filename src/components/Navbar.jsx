import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaCompass, FaHeart, FaUser } from 'react-icons/fa';

export default function Navbar() {
  return (
    <header>
      <nav>
        <div className="left">
          <ul>
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/fridge"><FaUtensils /> Fridge</Link></li>
            <li><Link to="/explore"><FaCompass /> Explore</Link></li>
            <li><Link to="/favorites"><FaHeart /> MyMeals</Link></li>
          </ul>
        </div>
        <div className="right">
          <Link to="/login" className="btn-dark"><FaUser /> Sign in / Register</Link>
        </div>
      </nav>
    </header>
  );
}
