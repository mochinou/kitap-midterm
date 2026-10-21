Kitap — Find Your Next Chapter
Kitap is a React single-page application for discovering books and building a personal reading list. It was created as a React midterm project using JavaScript, reusable components, and plain CSS.

Live demo: kitapv.netlify.app

GitHub repository: mochinou/kitap-midterm

Features
120 initial books across 8 genres.
Search by title, author, or words in the description.
Case-insensitive search with leading and trailing spaces removed.
Filter by genre and minimum rating.
Sort by title, rating, or publication year, or keep the featured order.
Pagination with 12 books per page.
A detail page for each book, including up to four other books from the same genre.
A controlled form for adding books, with field validation and submission feedback.
A reading list with bookmark and remove actions.
Persistent books and bookmarks using browser localStorage.
Loading, error, empty, and success states.
Responsive layouts for desktop, tablet, and mobile screens.
A not-found view for unknown pages or book IDs.
The available genres are Fiction, Classics, Fantasy, Mystery, Romance, Science Fiction, Non-fiction, and Poetry.

Tech Stack
React 18 — components, props, useState, useEffect, and useRef.
React Router 7 — client-side navigation.
Vite 6 — development server and production build.
JavaScript — application logic and data handling.
CSS — Grid, Flexbox, responsive styling, and cover designs.
JSON, Promises, delays, and localStorage — simulated API.
SVG — reusable icons and original book-cover artwork.
The project does not use Redux, TypeScript, a UI framework, or a separate backend.

Getting Started
Requirements
Node.js 20.19+ or 22.12+.
npm.
Installation
Bash

git clone https://github.com/mochinou/kitap-midterm.git
cd kitap-midterm
npm ci
npm run dev
Open the address printed in the terminal, usually http://localhost:5173.

If you downloaded the project as a ZIP, extract it and open a terminal in the folder containing 
package.json
. Use the Vite server rather than opening 
index.html
 directly.

Available Commands
Command	Purpose
npm ci	Install dependencies using the lock file
npm run dev	Start the development server
npm run check	Validate the initial JSON records
npm run build	Create a production build in dist/
npm run preview	Preview the production build locally
Project Structure
text

kitap-midterm/
├── public/
│   ├── fonts/                 # Local fonts and their licenses
│   ├── _redirects             # Netlify SPA fallback
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── booksApi.js        # Simulated API and storage helpers
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── BookCard.jsx
│   │   ├── BookCover.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── StatusState.jsx
│   │   ├── Footer.jsx
│   │   └── Icon.jsx
│   ├── data/
│   │   ├── books.json         # 120 initial book records
│   │   └── constants.js       # Genres, cover themes, and page size
│   ├── pages/
│   │   ├── Catalogue.jsx
│   │   ├── BookDetails.jsx
│   │   └── AddBook.jsx
│   ├── App.jsx                # Shared state and routes
│   ├── main.jsx               # React entry point
│   └── styles.css
├── docs/                      # Project notes and testing guides
├── scripts/
│   └── check-data.mjs         # Seed-data validation
├── index.html
├── netlify.toml
├── vercel.json
├── vite.config.js
├── package.json
└── package-lock.json
Application Routes
Route	Description
/	Discover and browse the full catalogue
/reading-list	View bookmarked books
/books/:id	Open a book's detail page
/add	Add a new book
For example, The Midnight Library is available at /books/book-016.

Data Source and Simulated API
The application uses one simulated data-access module: 
booksApi.js
.

getBooks() waits for 550 ms to simulate an asynchronous request.
On the first visit, the 120 records from books.json are saved to localStorage.
Later visits load the saved catalogue from the same browser.
addBook() waits for 650 ms, creates a UUID, and saves the new book.
React state is updated only after the storage write succeeds.
New books start with a rating of 0, displayed as New or Not rated yet. The reading list stores book IDs rather than duplicate book objects.

Storage keys:

text

kitap.books.v1
kitap.reading-list.v1
This is not a remote HTTP API or a shared database. The simulated API uses Promises and delays around local JSON/storage operations. Each browser and origin has its own data, so added books and bookmarks are not synchronized between users or devices. Localhost and the deployed website also have separate storage.

Clearing site data removes locally added books and bookmarks. If you edit books.json, existing localStorage records are not automatically replaced. Use a fresh browser profile to test changed seed data, or remove only the relevant test storage key before reloading. Restoring the demo catalogue replaces locally added books with the original 120 records.

State and Component Structure
App manages the shared catalogue, loading/error state, saved IDs, and notifications.
Catalogue manages local search, filters, sorting, and pagination.
AddBook manages controlled field values, validation errors, submission state, and success feedback.
Reusable components receive data and callbacks through props.
The catalogue processes data in this order:

text

All books or saved books
→ search and filters
→ sorting
→ pagination
→ rendered book cards
Changing a filter resets the current page to 1. Arrays and objects are updated immutably, and book lists use stable IDs as keys.

Effects handle catalogue loading, the notification timer, and route scrolling. Cleanup ignores outdated loading results and clears notification timers; it does not cancel the simulated API Promise itself.

Deployment
The application is publicly available at https://kitapv.netlify.app/.

To deploy another copy from this repository on Netlify, use:

Setting	Value
Production branch	main
Base directory	Repository root
Build command	npm run build
Publish directory	dist

netlify.toml
 contains the build configuration. No environment variables, API keys, or separate backend deployment are required.


_redirects
 provides the SPA fallback so direct links such as /books/book-016 continue to work after a browser refresh. A 
vercel.json
 rewrite configuration is also included for Vercel deployments.

For a manual deployment, run npm run build and upload the generated dist folder to Netlify. Rebuild before uploading whenever the source code changes.

Testing
Run the seed-data check and production build:

Bash

npm run check
npm run build
The data check verifies that the initial catalogue has at least 100 records, unique IDs and titles, known genres, and valid required fields. It is not a full React unit-test suite.

Useful browser checks:

Search for mAtT HaIg and confirm that The Midnight Library is found.
Select Fantasy and confirm that the initial dataset contains 15 matching books.
Change sorting, navigate between pages, and confirm that filters reset pagination.
Open a detail URL directly and refresh it.
Add a bookmark, refresh, and check the reading list.
Submit an empty add form to check validation, then add a valid book.
Check the layout at desktop and mobile widths.
Detailed scenarios are available in 

TESTING.md
.

Data and Asset Notes
Ratings are illustrative demo values, not real user votes.
Page counts may vary between editions.
Book descriptions are short summaries for the catalogue.
Covers are original SVG/CSS designs, not official publisher covers.
Fonts are served locally; their OFL license files are included in public/fonts/.
The project is a catalogue, not a store or an e-book reader. Authentication, payments, full book texts, and editing/deleting individual catalogue entries are not implemented.