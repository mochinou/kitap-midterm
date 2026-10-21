import Icon from './Icon';

export default function StatusState({ type = 'empty', title, message, children }) {
  return (
    <div className={`status-state status-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <div className="status-icon">
        <Icon name={type === 'error' ? 'alert' : type === 'success' ? 'check' : 'book'} size={28} />
      </div>
      <h2>{title}</h2>
      <p>{message}</p>
      {children && <div className="status-actions">{children}</div>}
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div className="loading-state" role="status" aria-label="Loading books">
      <span className="sr-only">Finding your next chapter…</span>
      <div className="book-grid" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton skeleton-cover" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        ))}
      </div>
    </div>
  );
}
