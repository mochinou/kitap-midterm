import { COVER_THEMES } from '../data/constants';

function CoverArt({ type }) {
  // Барлық мұқаба жергілікті SVG: сыртқы сурет немесе API қажет емес.
  if (type === 'leaf') {
    return (
      <>
        <path d="M100 170V45M100 100C42 100 42 49 42 49c58 0 58 51 58 51ZM100 140c60 0 60-51 60-51-60 0-60 51-60 51Z" />
        <path d="M100 77c39 0 39-36 39-36-39 0-39 36-39 36Z" />
      </>
    );
  }
  if (type === 'sun') {
    return (
      <>
        <circle cx="100" cy="75" r="40" />
        <path d="m20 165 53-60 35 43 22-27 50 44M20 181h160M45 194h110" />
        <path d="M100 12V2M149 27l8-8M169 74h12M51 27l-8-8M31 74H19" />
      </>
    );
  }
  if (type === 'moon') {
    return (
      <>
        <path d="M130 35a63 63 0 1 0 29 104c-48 7-80-47-29-104Z" />
        <path d="m156 32 3 10 10 3-10 3-3 10-3-10-10-3 10-3ZM40 156v10M35 161h10M167 164v10M162 169h10" />
        <circle cx="43" cy="47" r="2" />
      </>
    );
  }
  if (type === 'mountain') {
    return (
      <>
        <circle cx="144" cy="48" r="24" />
        <path d="m12 175 67-117 53 94 20-38 36 61ZM56 99l23-41 22 40-22-11-23 12ZM36 191h128" />
        <path d="M32 34h31M44 24v20" />
      </>
    );
  }
  if (type === 'waves') {
    return (
      <>
        {[42, 66, 90, 114, 138, 162].map((y) => (
          <path key={y} d={`M15 ${y}q42-35 85 0t85 0`} />
        ))}
      </>
    );
  }
  if (type === 'arch') {
    return (
      <>
        <path d="M36 183V83a64 64 0 0 1 128 0v100ZM54 183V86a46 46 0 0 1 92 0v97ZM73 183V89a27 27 0 0 1 54 0v94Z" />
        <circle cx="100" cy="134" r="13" />
      </>
    );
  }
  return (
    <>
      <circle cx="100" cy="103" r="67" />
      <circle cx="100" cy="103" r="44" />
      <circle cx="100" cy="103" r="21" />
      <path d="M100 14v178M12 103h176" />
      <circle cx="153" cy="62" r="7" fill="currentColor" />
    </>
  );
}

export default function BookCover({ book, small = false }) {
  const theme = COVER_THEMES[book.cover] || COVER_THEMES.forest;
  const isLongTitle = book.title.length > 25;

  return (
    <div
      className={`book-cover ${small ? 'small-cover' : ''} ${isLongTitle ? 'long-title' : ''}`}
      style={{
        '--cover-bg': theme.background,
        '--cover-ink': theme.ink,
        '--cover-accent': theme.accent,
      }}
    >
      <div className="cover-edition">THE KITAP COLLECTION</div>
      <div className="cover-title">{book.title}</div>
      <svg
        className="cover-art"
        viewBox="0 0 200 210"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <CoverArt type={book.art} />
      </svg>
      <div className="cover-author">{book.author}</div>
    </div>
  );
}
