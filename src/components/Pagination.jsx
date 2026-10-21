import { Fragment } from 'react';
import Icon from './Icon';

export default function Pagination({ page, totalPages, onChange }) {
  // Бірінші, соңғы және ағымдағы бетке жақын нөмірлер ғана көрсетіледі.
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (number) => number === 1 || number === totalPages || Math.abs(number - page) <= 1,
  );

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        <Icon name="left" size={17} />
      </button>
      {pages.map((number, index) => (
        <Fragment key={number}>
          {index > 0 && number - pages[index - 1] > 1 && <span className="pagination-gap">…</span>}
          <button
            type="button"
            className={page === number ? 'current' : ''}
            aria-label={`Page ${number}`}
            aria-current={page === number ? 'page' : undefined}
            onClick={() => onChange(number)}
          >
            {number}
          </button>
        </Fragment>
      ))}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        <Icon name="right" size={17} />
      </button>
    </nav>
  );
}
