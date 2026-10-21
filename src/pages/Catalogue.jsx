import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import StatusState, { LoadingGrid } from '../components/StatusState';
import Icon from '../components/Icon';
import { PAGE_SIZE } from '../data/constants';

const DEFAULT_FILTERS = { search: '', genre: 'All books', minRating: '0', sort: 'featured' };

export default function Catalogue({
  books,
  loading,
  error,
  onRetry,
  onRestore,
  savedIds,
  onToggleSaved,
  onlySaved = false,
}) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  function changeFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  const collection = onlySaved ? books.filter((book) => savedIds.includes(book.id)) : books;
  const search = filters.search.trim().toLowerCase();

  // Деректі өзгертпейміз: filter және [...array] жаңа массив қайтарады.
  const filteredBooks = collection.filter((book) => {
    const text = `${book.title} ${book.author} ${book.description}`.toLowerCase();
    return (
      text.includes(search) &&
      (filters.genre === 'All books' || book.genre === filters.genre) &&
      book.rating >= Number(filters.minRating)
    );
  });

  const sortedBooks = [...filteredBooks];
  if (filters.sort === 'title') sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
  if (filters.sort === 'rating')
    sortedBooks.sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title));
  if (filters.sort === 'newest')
    sortedBooks.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  if (filters.sort === 'oldest')
    sortedBooks.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));

  const totalPages = Math.ceil(sortedBooks.length / PAGE_SIZE);
  // Соңғы беттегі кітапты saved тізімнен алып тастағанда бос бет қалмайды.
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleBooks = sortedBooks.slice(start, start + PAGE_SIZE);

  return (
    <>
      {!onlySaved && <Hero books={books} />}
      <section
        className={`container collection ${onlySaved ? 'saved-collection' : ''}`}
        id="collection"
        aria-labelledby="collection-title"
      >
        <div className="collection-heading">
          <div>
            <div className="eyebrow">{onlySaved ? 'YOUR PERSONAL SHELF' : 'THE COLLECTION'}</div>
            <h2 id="collection-title">
              {onlySaved ? 'Stories for later.' : 'Find your next read.'}
            </h2>
            {onlySaved && (
              <p className="section-description">
                Keep the books that caught your eye. Come back when the moment is right.
              </p>
            )}
          </div>
          <span className="collection-count">
            <Icon name={onlySaved ? 'bookmark' : 'book'} size={17} />
            {collection.length} {collection.length === 1 ? 'book' : 'books'}
            {onlySaved ? ' saved' : ' to discover'}
          </span>
        </div>

        <FilterBar
          filters={filters}
          onChange={changeFilter}
          onReset={resetFilters}
          disabled={loading || Boolean(error)}
        />

        {loading ? (
          <LoadingGrid />
        ) : error ? (
          <StatusState type="error" title="A small plot twist." message={error}>
            <button className="button button-dark" onClick={onRetry} type="button">
              Try again
            </button>
            <button className="button button-outline" onClick={onRestore} type="button">
              Restore demo catalogue
            </button>
            <small className="restore-warning">
              Restoring replaces books added in this browser with the original 120 books.
            </small>
          </StatusState>
        ) : collection.length === 0 && onlySaved ? (
          <StatusState
            title="Your next chapter is waiting."
            message="Tap the bookmark on any book to keep it here. A good reading list starts with a little curiosity."
          >
            <Link to="/" className="button button-accent">
              Discover books <Icon name="arrow" size={17} />
            </Link>
          </StatusState>
        ) : sortedBooks.length === 0 ? (
          <StatusState
            title="No books on this shelf. Yet."
            message="Try a different title, author, or genre. Your next favorite might be just one search away."
          >
            <button type="button" className="button button-dark" onClick={resetFilters}>
              Clear all filters
            </button>
          </StatusState>
        ) : (
          <>
            <div className="results-label" role="status">
              {sortedBooks.length} {sortedBooks.length === 1 ? 'book' : 'books'}
              {search
                ? ` matching “${filters.search.trim()}”`
                : filters.genre !== 'All books'
                  ? ` in ${filters.genre}`
                  : ' for your next chapter'}
            </div>
            <div className="book-grid">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isSaved={savedIds.includes(book.id)}
                  onToggleSaved={onToggleSaved}
                />
              ))}
            </div>
            <div className="collection-bottom">
              <p role="status">
                Showing{' '}
                <strong>
                  {start + 1}–{Math.min(start + PAGE_SIZE, sortedBooks.length)}
                </strong>{' '}
                of {sortedBooks.length} books
              </p>
              {totalPages > 1 && (
                <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
              )}
            </div>
          </>
        )}
      </section>
      {!onlySaved && (
        <div className="container closing-note">
          <Icon name="sparkle" size={26} />
          <p>There’s a book for every version of you.</p>
          <span>LET CURIOSITY PICK THE NEXT ONE.</span>
        </div>
      )}
    </>
  );
}
