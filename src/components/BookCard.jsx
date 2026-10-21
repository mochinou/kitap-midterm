import { Link } from 'react-router-dom';
import BookCover from './BookCover';
import Icon from './Icon';

export default function BookCard({ book, isSaved, onToggleSaved }) {
  return (
    <article className="book-card">
      <div className="card-cover-wrap">
        <Link
          to={`/books/${book.id}`}
          className="cover-link"
          aria-label={`View details for ${book.title}`}
        >
          <BookCover book={book} />
        </Link>
        <button
          className={`save-button ${isSaved ? 'is-saved' : ''}`}
          type="button"
          aria-label={`${isSaved ? 'Remove' : 'Save'} ${book.title}${isSaved ? ' from' : ' to'} reading list`}
          aria-pressed={isSaved}
          onClick={() => onToggleSaved(book)}
          title={isSaved ? 'Remove from reading list' : 'Save for later'}
        >
          <Icon name="bookmark" size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-meta">
        <span>{book.genre}</span>
        <span className="rating">
          <Icon name="star" size={13} fill="currentColor" />
          {book.rating > 0 ? book.rating.toFixed(1) : 'New'}
        </span>
      </div>
      <h3>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h3>
      <p className="card-author">{book.author}</p>
    </article>
  );
}
