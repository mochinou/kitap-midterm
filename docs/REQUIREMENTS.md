# PDF талаптарына сәйкестік

Түпнұсқа тапсырма: React Midterm Project, 3 бет.

| Талап                              | Жобада орындалуы                                                                                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Complete React SPA                 | React + BrowserRouter, 4 негізгі URL, 404 route                                                                                                             |
| One data source                    | `src/api/booksApi.js` — бір simulated API модулі                                                                                                            |
| 100+ initial records               | `src/data/books.json` ішінде 120 толық жазба                                                                                                                |
| Promise, delay, JSON, localStorage | API ішінде 550/650 ms delay және тұрақты localStorage                                                                                                       |
| 5+ meaningful reusable components  | Header, BookCard, BookCover, FilterBar, Pagination, StatusState, Footer және басқалары                                                                      |
| List view                          | `Catalogue.jsx`                                                                                                                                             |
| Detail view                        | `BookDetails.jsx`, `/books/:id`                                                                                                                             |
| Controlled add form                | `AddBook.jsx`: 6 өріс, validation, submit/loading/error/success                                                                                             |
| Meaningful search                  | Атау, автор, сипаттама; case-insensitive, trim                                                                                                              |
| Filtering                          | 8 жанр және minimum rating; reading list ішінде де істейді                                                                                                  |
| Sorting                            | Featured, title A–Z, rating, newest/oldest release                                                                                                          |
| Pagination                         | 12 кітап/бет, result count, prev/next, page buttons                                                                                                         |
| useState                           | Ортақ дерек App-та, filters/page Catalogue-та, форма state-ы AddBook-та                                                                                     |
| useEffect                          | API load/retry, toast timer, route scroll, mounted guard                                                                                                    |
| Loading                            | Skeleton cards; detail loading; disabled submit және spinner                                                                                                |
| Error                              | Storage error, retry/restore; add form error; save error toast                                                                                              |
| Empty                              | Search жоқ нәтиже, бос reading list, жоқ detail                                                                                                             |
| Success                            | Кітап қосу success беті, save/remove toast                                                                                                                  |
| Dependencies and cleanup           | API `[retryCount]` + ignore; toast `[notice]` + clearTimeout; scroll `[pathname]`; AddBook mounted ref cleanup                                              |
| Stable keys                        | Кітаптарға `book.id`, жанрларға genre, pagination-ға page number                                                                                            |
| Component identity                 | Компоненттер модуль деңгейінде; discover/saved каталогтарына әдейі бөлек keys                                                                               |
| Immutable updates                  | Spread, filter, functional state updater; sort алдында массив көшіріледі                                                                                    |
| No direct DOM manipulation         | UI JSX/state арқылы; `innerHTML`, `appendChild`, `querySelector` арқылы UI басқару жоқ. Root initialization мен viewport scroll ғана браузермен байланысады |
| Responsive consistent UI           | Vanilla CSS, Grid/Flexbox, desktop/tablet/mobile breakpoints                                                                                                |
| Organized repository + README      | Source құрылымы, README, қазақша қорғау түсіндірмесі, тексеру нұсқаулығы                                                                                    |
| Deploy                             | Build және Netlify/Vercel конфигурациялары дайын. **Аккаунтқа жариялау және тұрақты public link алу әлі міндетті жеке қадам**                               |

## Submission checklist

Құжаттағы тапсыру бөлігі кодпен автоматты орындалмайды. Төмендегіні өз аккаунтыңда аяқтау керек:

1. Public GitHub repository link алу.
2. Тұрақты deployed application link алу; localhost/уақытша preview жеткіліксіз.
3. Сайттың public link-тен толық жұмыс істейтінін тексеру.
4. Екі link-ті тапсырып, дедлайнға дейін **Turn in** басу.

Бұл архивке ешқандай жалған repository URL немесе production URL енгізілген жоқ.
