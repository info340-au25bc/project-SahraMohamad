import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="left">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/fridge">Fridge</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </div>
      <div className="right">
        <button className="dark">
          <Link to="/login">Sign in / Register</Link>
        </button>
      </div>
    </nav>
  );
}
