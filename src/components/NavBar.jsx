import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div id="navbar">
      <ul className="navbar-list">
        <li>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/my-list">
            My List
          </Link>
        </li>
      </ul>
    </div>
  );
}
