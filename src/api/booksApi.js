import initialBooks from '../data/books.json';

const BOOKS_KEY = 'kitap.books.v1';
const READING_LIST_KEY = 'kitap.reading-list.v1';

// Promise + delay: сұраныс шынайы API сияқты бірден орындалмайды.
function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function readBooks() {
  const saved = localStorage.getItem(BOOKS_KEY);

  if (saved === null) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }

  let books;
  try {
    books = JSON.parse(saved);
  } catch {
    throw new Error(
      'Your saved catalogue could not be read. Restore the demo catalogue to start again.',
    );
  }

  const isValid =
    Array.isArray(books) &&
    books.every(
      (book) =>
        book &&
        typeof book.id === 'string' &&
        typeof book.title === 'string' &&
        typeof book.author === 'string' &&
        typeof book.genre === 'string' &&
        typeof book.description === 'string' &&
        Number.isFinite(book.rating) &&
        Number.isFinite(book.year) &&
        Number.isFinite(book.pages),
    );

  if (!isValid) {
    throw new Error(
      'Your saved catalogue has an unexpected format. You can restore the original demo data.',
    );
  }

  return books;
}

export async function getBooks() {
  await delay(550);
  return readBooks();
}

export async function addBook(values) {
  await delay(650);
  const books = readBooks();
  const newBook = {
    ...values,
    id: crypto.randomUUID(),
    rating: 0,
    cover: 'forest',
    art: 'leaf',
  };

  // Алдымен сақтау сәтті аяқталуы керек. Содан кейін ғана UI жаңарады.
  localStorage.setItem(BOOKS_KEY, JSON.stringify([newBook, ...books]));
  return newBook;
}

export function restoreDemoBooks() {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(initialBooks));
}

export function getReadingList() {
  try {
    const value = JSON.parse(localStorage.getItem(READING_LIST_KEY) || '[]');
    return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function saveReadingList(ids) {
  localStorage.setItem(READING_LIST_KEY, JSON.stringify(ids));
}
