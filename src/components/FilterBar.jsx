import { GENRES } from '../data/constants';
import Icon from './Icon';

export default function FilterBar({ filters, onChange, onReset, disabled }) {
  const hasFilters =
    filters.search ||
    filters.genre !== 'All books' ||
    filters.minRating !== '0' ||
    filters.sort !== 'featured';

  return (
    <div className="filter-bar">
      <div className="filter-top-row">
        <div className="search-input">
          <Icon name="search" size={19} />
          <label htmlFor="book-search" className="sr-only">
            Search by title, author, or keyword
          </label>
          <input
            id="book-search"
            type="search"
            placeholder="Search by title, author, or keyword..."
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="select-field rating-filter">
          <label htmlFor="rating-filter">
            <Icon name="star" size={15} /> Rating
          </label>
          <select
            id="rating-filter"
            value={filters.minRating}
            onChange={(event) => onChange('minRating', event.target.value)}
            disabled={disabled}
          >
            <option value="0">Any rating</option>
            <option value="4">4.0 & up</option>
            <option value="4.5">4.5 & up</option>
          </select>
        </div>
        <div className="select-field sort-field">
          <label htmlFor="book-sort">Sort by</label>
          <select
            id="book-sort"
            value={filters.sort}
            onChange={(event) => onChange('sort', event.target.value)}
            disabled={disabled}
          >
            <option value="featured">Featured</option>
            <option value="rating">Highest rated</option>
            <option value="title">Title: A–Z</option>
            <option value="newest">Newest release</option>
            <option value="oldest">Oldest release</option>
          </select>
        </div>
      </div>
      <div className="genre-row" aria-label="Filter by genre">
        <div className="genre-chips">
          {['All books', ...GENRES].map((genre) => (
            <button
              key={genre}
              className={`genre-chip ${filters.genre === genre ? 'active' : ''}`}
              type="button"
              aria-pressed={filters.genre === genre}
              onClick={() => onChange('genre', genre)}
              disabled={disabled}
            >
              {genre}
            </button>
          ))}
        </div>
        {hasFilters && (
          <button className="reset-filters" onClick={onReset} type="button">
            <Icon name="close" size={13} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
