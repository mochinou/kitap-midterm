import { Link, useParams } from 'react-router-dom';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';
import StatusState from '../components/StatusState';
import Icon from '../components/Icon';

export default function BookDetails({ books, loading, error, onRetry, savedIds, onToggleSaved }) {
  const { id } = useParams();
  const book = books.find((item) => item.id === id);

  if (loading)
    return (
      <div className="container detail-loading" role="status">
        <span className="spinner" /> Opening the book…
      </div>
    );
  if (error)
    return (
      <div className="container page-section">
        <StatusState type="error" title="We couldn't open this chapter." message={error}>
          <button className="button button-dark" onClick={onRetry} type="button">
            Try again
          </button>
          <Link to="/" className="button button-outline">
            Back to collection
          </Link>
        </StatusState>
      </div>
    );
  if (!book)
    return (
      <div className="container page-section">
        <StatusState
          title="This book isn't on the shelf."
          message="It may have been removed, or the link may be incorrect. There are plenty more stories to discover."
        >
          <Link to="/" className="button button-accent">
            Back to collection <Icon name="arrow" size={17} />
          </Link>
        </StatusState>
      </div>
    );

  const isSaved = savedIds.includes(book.id);
  const relatedBooks = books
    .filter((item) => item.genre === book.genre && item.id !== book.id)
    .slice(0, 4);

  return (
    <div className="container details-page">
      <Link to="/" className="back-link">
        <Icon name="left" size={16} /> Back to collection
      </Link>
      <article className="book-detail">
        <div className="detail-cover-panel">
          <div className="detail-cover">
            <BookCover book={book} />
          </div>
          <span className="detail-cover-caption">ORIGINAL KITAP COVER DESIGN</span>
        </div>
        <div className="detail-copy">
          <div className="detail-topline">
            <span className="tag">{book.genre}</span>
            <span className="rating">
              <Icon name="star" size={16} fill="currentColor" />
              {book.rating > 0 ? `${book.rating.toFixed(1)} / 5` : 'Not rated yet'}
            </span>
          </div>
          <h1>{book.title}</h1>
          <p className="detail-author">
            by <strong>{book.author}</strong>
          </p>
          <div className="detail-rule" />
          <div className="eyebrow">BETWEEN THE COVERS</div>
          <p className="detail-description">{book.description}</p>
          <dl className="book-facts">
            <div>
              <dt>Published</dt>
              <dd>{book.year < 0 ? `${Math.abs(book.year)} BCE` : book.year}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{book.pages} pages</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{book.genre}</dd>
            </div>
          </dl>
          <button
            className={`button ${isSaved ? 'button-dark' : 'button-accent'} detail-save`}
            type="button"
            onClick={() => onToggleSaved(book)}
            aria-pressed={isSaved}
          >
            <Icon name={isSaved ? 'check' : 'bookmark'} size={18} />
            {isSaved ? 'In your reading list' : 'Save to reading list'}
          </button>
          <p className="detail-note">
            A personal shelf, saved in this browser. Ratings and page counts are illustrative demo
            data.
          </p>
        </div>
      </article>
      {relatedBooks.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <div className="collection-heading">
            <div>
              <div className="eyebrow">A LITTLE MORE TO EXPLORE</div>
              <h2 id="related-title">Keep the story going.</h2>
            </div>
            <Link to="/" className="text-link">
              All books <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="book-grid">
            {relatedBooks.map((item) => (
              <BookCard
                key={item.id}
                book={item}
                isSaved={savedIds.includes(item.id)}
                onToggleSaved={onToggleSaved}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
