import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const books = JSON.parse(readFileSync(new URL('../src/data/books.json', import.meta.url), 'utf8'));
const genres = new Set([
  'Fiction',
  'Classics',
  'Fantasy',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Non-fiction',
  'Poetry',
]);

assert.ok(books.length >= 100, 'The initial catalogue must contain at least 100 records.');
assert.equal(new Set(books.map((book) => book.id)).size, books.length, 'IDs must be unique.');
assert.equal(
  new Set(books.map((book) => book.title)).size,
  books.length,
  'Initial titles must be unique.',
);
for (const book of books) {
  assert.equal(typeof book.id, 'string');
  assert.ok(book.title.length >= 2 && book.author.length >= 2);
  assert.ok(genres.has(book.genre), `Unknown genre: ${book.genre}`);
  assert.ok(Number.isInteger(book.year) && Number.isInteger(book.pages) && book.pages > 0);
  assert.ok(book.rating >= 0 && book.rating <= 5);
  assert.ok(book.description.length >= 20);
}
console.log(`PASS: ${books.length} valid books, ${genres.size} genres, unique stable IDs.`);
