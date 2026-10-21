import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { getBooks, getReadingList, restoreDemoBooks, saveReadingList } from './api/booksApi';
import Header from './components/Header';
import Footer from './components/Footer';
import Icon from './components/Icon';
import StatusState from './components/StatusState';
import Catalogue from './pages/Catalogue';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [savedIds, setSavedIds] = useState(getReadingList);
  const [notice, setNotice] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');

    getBooks()
      .then((data) => {
        if (!ignore) setBooks(data);
      })
      .catch((err) => {
        if (!ignore)
          setError(err.message || 'The catalogue could not be loaded. Please try again.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    // Ескі сұраныс аяқталса, жаңа беттің state-ын өзгертпейді.
    return () => {
      ignore = true;
    };
  }, [retryCount]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  function toggleSaved(book) {
    const wasSaved = savedIds.includes(book.id);
    const updated = wasSaved ? savedIds.filter((id) => id !== book.id) : [...savedIds, book.id];
    try {
      saveReadingList(updated);
      setSavedIds(updated);
      setNotice({
        type: 'success',
        message: wasSaved
          ? `Removed “${book.title}” from your reading list.`
          : `Saved “${book.title}” to your reading list.`,
      });
    } catch {
      setNotice({
        type: 'error',
        message:
          'Your reading list could not be saved. Browser storage may be unavailable or full.',
      });
    }
  }

  function handleRestore() {
    try {
      restoreDemoBooks();
      setRetryCount((count) => count + 1);
    } catch {
      setError(
        'Browser storage is unavailable or full. Please allow local storage, then try again.',
      );
    }
  }

  function handleBookAdded(book) {
    setBooks((current) => [book, ...current.filter((item) => item.id !== book.id)]);
  }

  const savedCount = books.filter((book) => savedIds.includes(book.id)).length;
  const sharedProps = {
    books,
    loading,
    error,
    savedIds,
    onToggleSaved: toggleSaved,
    onRetry: () => setRetryCount((count) => count + 1),
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header savedCount={savedCount} />
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={<Catalogue key="discover" {...sharedProps} onRestore={handleRestore} />}
          />
          <Route
            path="/reading-list"
            element={
              <Catalogue key="reading-list" {...sharedProps} onRestore={handleRestore} onlySaved />
            }
          />
          <Route path="/books/:id" element={<BookDetails {...sharedProps} />} />
          <Route path="/add" element={<AddBook onBookAdded={handleBookAdded} />} />
          <Route
            path="*"
            element={
              <div className="container page-section">
                <StatusState
                  title="A little off the beaten path."
                  message="This page doesn't exist, but a whole collection of good books does."
                >
                  <Link to="/" className="button button-accent">
                    Find your way back <Icon name="arrow" size={17} />
                  </Link>
                </StatusState>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
      {notice && (
        <div
          className={`toast ${notice.type === 'error' ? 'toast-error' : ''}`}
          role={notice.type === 'error' ? 'alert' : 'status'}
        >
          <Icon name={notice.type === 'error' ? 'alert' : 'check'} size={18} />
          <span>{notice.message}</span>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notification">
            <Icon name="close" size={15} />
          </button>
        </div>
      )}
    </>
  );
}
