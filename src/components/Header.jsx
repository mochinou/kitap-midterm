import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

export default function Header({ savedCount }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Kitap home">
          <span className="brand-symbol">
            <Icon name="book" size={23} />
          </span>
          <span>
            kitap<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Discover
          </NavLink>
          <NavLink to="/reading-list">
            Reading list <span className="nav-count">{savedCount}</span>
          </NavLink>
        </nav>
        <Link className="button button-dark header-add" to="/add">
          <Icon name="plus" size={17} />
          <span>Add a book</span>
        </Link>
      </div>
    </header>
  );
}
