import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

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
