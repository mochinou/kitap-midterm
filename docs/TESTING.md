# Тексеру нұсқаулығы

## Автоматты тексеру

```bash
npm ci
npm run check
npm run build
npm audit
```

`check` бастапқы жазба санын, ID/title бірегейлігін, жанрларды, сандық өрістерді және сипаттаманы тексереді. Бұл browser тесттерінің орнына жүрмейді.

## Қолмен тексеру сценарийлері

### 1. Бастапқы каталог / loading

1. Сайтты жаңа браузер профилінде аш.
2. Алғашқы 550 ms ішінде skeleton көрсетіледі.
3. Одан кейін 120 кітап және 10 бет бар.
4. Бір бетте 12 карточка көрсетіледі.

### 2. Search

1. Search-ке `  mAtT HaIg  ` енгіз.
2. `The Midnight Library` ғана қалуы керек.
3. `no-such-book-12345` деп өзгерт.
4. Empty state және **Clear all filters** көрсетілуі керек.
5. Clear басқанда 120 кітап қайта келеді.

Іздеу авторды, атауды және сипаттаманы тексереді. Артық шеткі бос орын мен үлкен/кіші әріп нәтижені өзгертпейді.

### 3. Filter, sort, pagination

1. Fantasy жанрын таңда: 15 кітап.
2. Title A–Z sort таңда: алғашқысы `A Wizard of Earthsea`.
3. 2-бетке өт: 3 кітап, Showing 13–15 of 15.
4. Rating 4.5 & up таңда: 9 кітап, pagination 1-бетке қайтады.
5. Reset бас: барлық 120 кітап.
6. Highest rated, Newest release, Oldest release сорттарын бөлек тексер.
7. 10-бетте Next disabled; 1-бетте Previous disabled.

### 4. Detail және direct URL

1. `The Midnight Library` мұқабасын немесе атауын бас.
2. Автор, сипаттама, 2020 жыл, 304 pages және жанр көрінуі керек.
3. `/books/book-016` URL-ын көшіріп, жаңа терезеде аш.
4. Refresh жаса: сол detail қайта ашылады.
5. `/books/unknown-book` аш: book not found көрінісі.
6. `/not-a-page` аш: page not found көрінісі.

### 5. Reading list

1. Карточкадағы bookmark батырмасын бас.
2. Header саны 1-ге өседі, toast шығады.
3. Reading list аш: сол кітап бар.
4. Refresh жаса: кітап сақталып тұрады.
5. Detail бетінде де `In your reading list` көрсетіледі.
6. Қайта басып алып таста.
7. Reading list бос болса, арнайы empty state шығады.
8. 13 кітап сақтап, 2-беттегі жалғыз кітапты алып таста: бос 2-бетте қалмай, бар соңғы бет көрсетілуі керек.

### 6. Controlled form / validation / success

1. Add a book аш.
2. Бос форманы жібер: title, author, year, pages, description қателері шығады.
3. Мысал мәндер енгіз:

```text
Book title: The Quiet Steppe
Author: Aida Nur
Genre: Fiction
Publication year: 2024
Page count: 256
About the book: A student returns to her hometown and discovers the small stories that connect its people. A warm story about friendship, memory, and finding a place to belong.
```

4. Title/author жазылған сайын desktop preview жаңарады.
5. Submit кезінде өрістер мен submit батырмасы disabled, spinner болады.
6. Success көрінісі шығады.
7. View your book арқылы жаңа detail ашылады.
8. Жаңа кітап рейтингсіз: `Not rated yet`.
9. Refresh жаса: кітап жоғалмайды.
10. Каталогта жалпы саны 121 болады.
11. Add another book басқанда форма тазарады.
12. Pages `0`/`1.5`, future year немесе тым қысқа description қабылданбауы керек.

### 7. API error және қалпына келтіру

**Тек тест дерегінде жаса. Restore осы браузерде өзің қосқан кітаптарды жояды.**

Сайт ашық тұрған браузердің DevTools → Console ішінде:

```js
localStorage.setItem('kitap.books.v1', '{broken-json');
location.reload();
```

Күтілетін нәтиже:

- `A small plot twist.` error көрінісі.
- Қате мәтіні және **Try again**, **Restore demo catalogue** батырмалары.
- Try again → loading → дерек әлі бұзылғандықтан қайта error.
- Restore demo catalogue → 120 бастапқы кітап қалпына келеді.

Форма/reading list сақтау қатесін тексеру үшін браузердің site storage рұқсатын өшіріп көруге болады. Қолдау браузерге байланысты. Қате болса, success деп көрсетілмеуі тиіс және формадағы мәтін қалуы керек.

### 8. Responsive / accessibility

- 1440 px desktop: 4 баған.
- 768 px tablet: 3 баған.
- 375 px және 320 px phone: 2 баған, көлденең page overflow жоқ.
- Mobile жанрлар жолағын көлденең сырғытып, барлық жанрға жетуге болады.
- Tab арқылы nav, input, genre, save және pagination басқарылуы керек.
- Input-тардың label-дары бар.
- Bookmark `aria-pressed` күйі дұрыс өзгереді.
- Loading/status/error хабарламалары screen reader-ге жарияланады.
- Reduced motion қосылғанда анимация өшеді.

## Тапсыруға дейінгі соңғы тексеру

Жергілікті тест жеткіліксіз. Осы сценарийлердің негізгісін **deployed public URL-да** қайтала: әсіресе detail URL-ын тікелей ашу және refresh. Netlify-де `_redirects`, Vercel-де `vercel.json` SPA fallback үшін қосылған.
