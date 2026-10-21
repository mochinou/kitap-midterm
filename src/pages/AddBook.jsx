import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { addBook } from '../api/booksApi';
import { GENRES } from '../data/constants';
import BookCover from '../components/BookCover';
import StatusState from '../components/StatusState';
import Icon from '../components/Icon';

const EMPTY_FORM = {
  title: '',
  author: '',
  genre: 'Fiction',
  year: '',
  pages: '',
  description: '',
};

function FieldError({ message, id }) {
  return message ? (
    <span className="field-error" id={id}>
      {message}
    </span>
  ) : null;
}

export default function AddBook({ onBookAdded }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdBook, setCreatedBook] = useState(null);
  const isMounted = useRef(false);

  // Сұраныс жүріп жатқанда басқа бетке кетсек, ескі форманы жаңартпаймыз.
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitError('');
  }

  function validateForm() {
    const nextErrors = {};
    if (form.title.trim().length < 2)
      nextErrors.title = 'Enter a title with at least 2 characters.';
    if (form.author.trim().length < 2)
      nextErrors.author = 'Enter an author name with at least 2 characters.';
    if (!GENRES.includes(form.genre)) nextErrors.genre = 'Choose a genre from the list.';
    if (
      !form.year ||
      !Number.isInteger(Number(form.year)) ||
      Number(form.year) < -1000 ||
      Number(form.year) > new Date().getFullYear() + 1
    )
      nextErrors.year = 'Enter a whole year between 1000 BCE and next year.';
    if (
      !form.pages ||
      !Number.isInteger(Number(form.pages)) ||
      Number(form.pages) < 1 ||
      Number(form.pages) > 10000
    )
      nextErrors.pages = 'Enter a whole page count between 1 and 10,000.';
    if (form.description.trim().length < 20)
      nextErrors.description = 'Tell us a little more: at least 20 characters.';
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      const book = await addBook({
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        year: Number(form.year),
        pages: Number(form.pages),
      });
      onBookAdded(book);
      if (isMounted.current) setCreatedBook(book);
    } catch {
      if (isMounted.current)
        setSubmitError(
          'Your book could not be saved. Check that browser storage is available and try again.',
        );
    } finally {
      if (isMounted.current) setSubmitting(false);
    }
  }

  function addAnother() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitError('');
    setCreatedBook(null);
  }

  if (createdBook) {
    return (
      <div className="container success-page">
        <StatusState
          type="success"
          title="A new story is on the shelf."
          message={`“${createdBook.title}” has been added to your catalogue. Thanks for making a little more room for discovery.`}
        >
          <Link to={`/books/${createdBook.id}`} className="button button-accent">
            View your book <Icon name="arrow" size={17} />
          </Link>
          <button type="button" className="button button-outline" onClick={addAnother}>
            Add another book
          </button>
          <Link className="success-back" to="/">
            Back to collection
          </Link>
        </StatusState>
      </div>
    );
  }

  const previewBook = {
    ...form,
    title: form.title.trim() || 'Your next great read',
    author: form.author.trim() || 'Your favorite author',
    cover: 'forest',
    art: 'leaf',
  };

  return (
    <div className="container add-page">
      <Link to="/" className="back-link">
        <Icon name="left" size={16} /> Back to collection
      </Link>
      <div className="add-heading">
        <div className="eyebrow">MAKE ROOM FOR ANOTHER STORY</div>
        <h1>Share a good book.</h1>
        <p>Found something worth reading? Add it to the collection.</p>
      </div>
      <div className="add-layout">
        <form className="book-form" onSubmit={handleSubmit} noValidate>
          <div className="form-section-label">
            <span>01</span>
            <h2>The book details</h2>
            <small>All fields are required</small>
          </div>
          <fieldset disabled={submitting}>
            <div className="form-field">
              <label htmlFor="title">Book title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={100}
                placeholder="e.g. The Midnight Library"
                required
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              <FieldError id="title-error" message={errors.title} />
            </div>
            <div className="form-field">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                name="author"
                value={form.author}
                onChange={handleChange}
                maxLength={80}
                placeholder="e.g. Matt Haig"
                required
                aria-invalid={Boolean(errors.author)}
                aria-describedby={errors.author ? 'author-error' : undefined}
              />
              <FieldError id="author-error" message={errors.author} />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.genre)}
                  aria-describedby={errors.genre ? 'genre-error' : undefined}
                >
                  {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <FieldError id="genre-error" message={errors.genre} />
              </div>
              <div className="form-field">
                <label htmlFor="year">Publication year</label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  min="-1000"
                  max={new Date().getFullYear() + 1}
                  step="1"
                  placeholder="2020"
                  required
                  aria-invalid={Boolean(errors.year)}
                  aria-describedby={errors.year ? 'year-error' : undefined}
                />
                <FieldError id="year-error" message={errors.year} />
              </div>
              <div className="form-field">
                <label htmlFor="pages">Page count</label>
                <input
                  id="pages"
                  name="pages"
                  type="number"
                  value={form.pages}
                  onChange={handleChange}
                  min="1"
                  max="10000"
                  step="1"
                  placeholder="304"
                  required
                  aria-invalid={Boolean(errors.pages)}
                  aria-describedby={errors.pages ? 'pages-error' : undefined}
                />
                <FieldError id="pages-error" message={errors.pages} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="description">About the book</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                maxLength={1200}
                placeholder="What is this book about? Give another reader a reason to turn the first page."
                required
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? 'description-error description-hint' : 'description-hint'
                }
              />
              <div className="textarea-hint" id="description-hint">
                <span>At least 20 characters. No spoilers, please.</span>
                <span>{form.description.length}/1200</span>
              </div>
              <FieldError id="description-error" message={errors.description} />
            </div>
          </fieldset>
          {Object.values(errors).some(Boolean) && (
            <p className="form-validation-summary" role="alert">
              Please check the highlighted fields before adding your book.
            </p>
          )}
          {submitError && (
            <p className="form-submit-error" role="alert">
              <Icon name="alert" size={17} />
              {submitError}
            </p>
          )}
          <div className="form-actions">
            <Link to="/" className="button button-outline">
              Cancel
            </Link>
            <button className="button button-accent" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner" /> Adding your book…
                </>
              ) : (
                <>
                  Add to collection <Icon name="plus" size={17} />
                </>
              )}
            </button>
          </div>
        </form>
        <aside className="form-preview">
          <div className="eyebrow">A PEEK AT YOUR NEW ADDITION</div>
          <div className="preview-cover">
            <BookCover book={previewBook} />
          </div>
          <h2>
            Every book belongs
            <br />
            on someone’s shelf.
          </h2>
          <p>Your book is saved in this browser, ready to find its way into your reading list.</p>
          <span className="preview-badge">
            <Icon name="sparkle" size={16} /> A little discovery starts here
          </span>
        </aside>
      </div>
    </div>
  );
}
