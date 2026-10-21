import BookCover from './BookCover';
import Icon from './Icon';

export default function Hero({ books }) {
  const favorites = [books[2], books[0], books[3]].filter(Boolean);

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="tiny-dot" /> A PLACE FOR CURIOUS MINDS
        </div>
        <h1 id="hero-title">
          A whole world.
          <br />
          One more <em>chapter.</em>
        </h1>
        <p>
          Big ideas, faraway places, and stories that stay with you.
          <br className="desktop-break" /> Find your next favorite, one book at a time.
        </p>
        <a href="#collection" className="button button-accent">
          Explore the collection <Icon name="arrow" size={18} />
        </a>
        <div className="hero-footnote">
          <span className="mini-stars">✦ ✦ ✦</span>
          <span>{books.length || 120} books. Endless possibilities.</span>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-orbit" />
        <div className="hero-spark">
          <Icon name="sparkle" size={42} />
        </div>
        <span className="hero-side-label">GOOD STORIES LIVE HERE</span>
        <div className="hero-stack">
          {favorites.map((book, index) => (
            <div key={book.id} className={`hero-book hero-book-${index}`}>
              <BookCover book={book} small />
            </div>
          ))}
        </div>
        <div className="hero-caption">
          <span className="caption-line" /> A little escape. A lot to discover.
        </div>
      </div>
    </section>
  );
}
