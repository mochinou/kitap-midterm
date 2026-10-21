import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Icon name="book" size={20} />
          <strong>kitap.</strong>
          <span>A little curiosity goes a long way.</span>
        </div>
        <div className="footer-links">
          <Link to="/">Discover books</Link>
          <Link to="/add">Share a book</Link>
          <span>React midterm · 2026</span>
        </div>
      </div>
    </footer>
  );
}
