# Kitap жобасын қорғауға дайындық

Бұл файл — кодты түсініп, өз сөзіңмен түсіндіруге арналған нұсқаулық. Жауаптарды жай жаттамай, көрсетілген файлдарды қатар ашып оқы.

## 1. Жобаны қысқаша таныстыру

> Kitap — React арқылы жасалған кітаптар каталогы. Қолданушы 120 кітаптың ішінен іздейді, жанр мен рейтинг бойынша сүзеді, сұрыптайды, беттерге бөледі және кітап туралы толық ақпаратты ашады. Жаңа кітап қосып, reading list-ке сақтай алады. Деректер Promise, delay, JSON және localStorage қолданатын simulated API арқылы алынады.

Frontend қана бар. Ортақ backend немесе көпқолданушылық база жоқ; дерек сол браузерде сақталады.

## 2. Компоненттер ағашы

```text
main.jsx
└── BrowserRouter
    └── App
        ├── Header
        ├── Routes
        │   ├── Catalogue (Discover немесе Reading list)
        │   │   ├── Hero (тек Discover)
        │   │   │   └── BookCover
        │   │   ├── FilterBar
        │   │   ├── LoadingGrid / StatusState
        │   │   ├── BookCard × 12
        │   │   │   ├── BookCover
        │   │   │   └── Icon
        │   │   └── Pagination
        │   ├── BookDetails
        │   │   ├── BookCover
        │   │   └── BookCard (ұқсас кітаптар)
        │   └── AddBook
        │       ├── FieldError
        │       ├── BookCover (live preview)
        │       └── StatusState (success)
        ├── Footer
        └── Toast (хабарлама)
```

Компоненттер файлдың ішінде басқа компоненттің render функциясына салынбаған. Олар модуль деңгейінде жарияланған, сондықтан render сайын жаңа component type жасалмайды.

## 3. State қайда сақталған және неге?

| State                          | Компонент   | Себебі                                                     |
| ------------------------------ | ----------- | ---------------------------------------------------------- |
| `books`, `loading`, `error`    | `App`       | Каталогқа да, detail бетіне де керек                       |
| `retryCount`                   | `App`       | API сұранысын қайта іске қосады                            |
| `savedIds`                     | `App`       | Header саны, карточкалар және reading list бірге қолданады |
| `notice`                       | `App`       | Кез келген бетте toast көрсете аламыз                      |
| `filters`, `page`              | `Catalogue` | Тек каталогтың көрінісіне қатысты                          |
| `form`, `errors`, `submitting` | `AddBook`   | Форманың жергілікті state-ы                                |
| `createdBook`, `submitError`   | `AddBook`   | Submit нәтижесін көрсетеді                                 |

`BookCard`, `FilterBar`, `Pagination` өздеріне қажет ақпаратты props арқылы алады. Олар ортақ деректі өз ішінде көшіріп сақтамайды.

## 4. Props және деректің жүру бағыты

Дерек ата-анадан балаға беріледі:

```jsx
<BookCard
  key={book.id}
  book={book}
  isSaved={savedIds.includes(book.id)}
  onToggleSaved={toggleSaved}
/>
```

- `book` — көрсетілетін ақпарат.
- `isSaved` — батырманың күйі.
- `onToggleSaved` — ата-ана жіберген функция.

Батырма басылғанда бала `onToggleSaved(book)` шақырады. `App` жаңа `savedIds` массивін құрады, storage-ке сақтайды және state-ты жаңартады. Содан кейін жаңа props төменге келеді. Бала ата-ананың state-ын тікелей өзгертпейді.

## 5. Controlled form деген не?

Input мәнін React state басқарады:

```jsx
<input name="title" value={form.title} onChange={handleChange} />
```

`value` state-тан келеді, `onChange` state-ты жаңартады:

```js
const { name, value } = event.target;
setForm((current) => ({ ...current, [name]: value }));
```

`[name]` — қай input өзгерсе, сол өрісті ауыстырады. Мысалы, `name="author"` болса, `author` жаңарады. Spread `...current` қалған өрістерді сақтайды.

Submit кезінде:

1. `event.preventDefault()` браузердің толық refresh жасауын тоқтатады.
2. `validateForm()` өрістерді тексереді.
3. Қате болса, `errors` көрсетіледі; API шақырылмайды.
4. Сұраныс кезінде `submitting=true`; қайталанған submit бұғатталады.
5. `addBook()` сәтті болса, `App` тізімді жаңартады, форма success көрінісін ашады.
6. Қате болса, енгізілген мәндер жоғалмайды және retry жасауға болады.

## 6. State-ты неге тікелей өзгертпейміз?

Қате:

```js
books.push(newBook);
```

Дұрыс:

```js
setBooks((current) => [newBook, ...current]);
```

Жаңа массив жаңа reference береді. React өзгерісті көре алады; бұрынғы state snapshot бұзылмайды. Reading list-тен алып тастағанда `filter`, қосқанда spread қолданылады.

## 7. Search, filter, sort, pagination

`src/pages/Catalogue.jsx` файлын аш.

Реті маңызды:

```text
Барлық кітап
→ керек болса тек saved кітаптар
→ search + genre + rating filter
→ sort
→ slice (pagination)
→ map (карточкаларды көрсету)
```

Іздеуде `trim()` артық бос орынды, `toLowerCase()` үлкен/кіші әріп айырмасын жояды.

Фильтрден кейінгі тізімнен ғана жалпы бет саны есептеледі:

```js
const totalPages = Math.ceil(sortedBooks.length / PAGE_SIZE);
const start = (currentPage - 1) * PAGE_SIZE;
const visibleBooks = sortedBooks.slice(start, start + PAGE_SIZE);
```

`PAGE_SIZE = 12`. Мысалы, 2-бет үшін `start = 12`, сондықтан `slice(12, 24)` алынады.

Жанр, search, rating немесе sort өзгерсе, `setPage(1)` орындалады. Saved тізімнің соңғы бетіндегі кітап алынып тасталса, `currentPage` бар соңғы бетке шектеледі. Осылай бос соңғы бет қалып қоймайды.

`.sort()` массивті өзгерте алады. Сондықтан `const sortedBooks = [...filteredBooks]` арқылы көшірме жасалған.

## 8. API дерегі UI-ға қалай келеді?

```text
books.json / localStorage
→ booksApi.getBooks()
→ Promise + 550 ms delay
→ App useEffect
→ setBooks(data)
→ Catalogue props
→ BookCard
```

Бірінші іске қосқанда 120 жазба storage-ке жазылады. Кейін сақталған каталог оқылады. Жаңа кітап `crypto.randomUUID()` арқылы тұрақты ID алады. Rating бастапқыда `0`, сондықтан UI-да `New`/`Not rated yet` деп көрсетіледі.

Қосу кезінде storage-ке жазу сәтсіз болса, API error тастайды. UI-да сәтті қосылды деп жалған көрсетілмейді.

## 9. useEffect және dependency array

`App.jsx` ішіндегі үш effect:

### Деректерді алу — `[retryCount]`

Алғашқы mount-та және `retryCount` өзгергенде `getBooks()` шақырылады. `Try again` сол counter-ды өсіреді.

`books`-ты dependency-ге қоспаймыз: effect-тің өзі `setBooks` жасайды. Қосып қойсақ, қажетсіз қайта-қайта сұраныс жүруі мүмкін.

### Toast — `[notice]`

Жаңа хабарлама келсе, 3500 ms кейін жасырылады. Cleanup бұрынғы таймерді `clearTimeout(timer)` арқылы тоқтатады.

### Scroll — `[pathname]`

SPA ішінде басқа бетке өткенде viewport жоғарыға қайтады. Бұл React басқаратын HTML-ді қолмен өзгерту емес, браузердің scroll side effect-і.

Search пен sort-ты effect ішінде есептемейміз. Олар бар state-тан render кезінде тікелей есептелетін мәндер.

## 10. Cleanup және race condition

API effect ішінде:

```js
let ignore = false;

getBooks().then((data) => {
  if (!ignore) setBooks(data);
});

return () => {
  ignore = true;
};
```

Жаңа сұраныс басталғанда бұрынғы effect cleanup-ы жүреді. Ескі Promise кейін аяқталса да, оның нәтижесі жаңа state-тың үстінен жазылмайды. Симуляцияның қысқа таймері аяқтала береді, бірақ ескірген нәтиже UI-ға жіберілмейді.

**Race condition:** екі сұраныстың қайсысы бұрын аяқталатыны белгісіз; ескі жауап жаңасын басып кетуі мүмкін. `ignore` соған жол бермейді. Нақты `fetch` API-да `AbortController` де қолдануға болады.

`AddBook` компонентінде `isMounted` ref бар. Submit аяқталғанша басқа бетке кетсек, unmount болған форманың state-ы жаңартылмайды. Ал ортақ каталог `onBookAdded` арқылы дұрыс жаңарады.

## 11. useRef пен useState айырмасы

`useState` өзгерсе, React re-render жоспарлайды. `useRef` ішіндегі `.current` өзгерсе, re-render болмайды. Мұнда ref тек компонент әлі ашық па деген қызметтік ақпаратқа керек; экранда көрсетілетін мәлімет ref-те сақталмаған.

## 12. State snapshot және batching

Әр render сол сәттегі state мәндерін көреді. `setPage(1)` функция ішіндегі бұрынғы `page` айнымалысын бірден ауыстырмайды; келесі render-де жаңа мән келеді.

React бір event ішіндегі бірнеше update-ті batching арқылы біріктіре алады. Мысалы, `changeFilter` ішінде filters жаңартылып, page 1-ге қайтады; аралық жартылай күйді бөлек көрсету қажет емес.

Алдыңғы мәнге сүйенгенде functional updater қауіпсіз:

```js
setRetryCount((count) => count + 1);
```

## 13. Stale closure деген не?

Async функция немесе таймер өзі жасалған render-дегі мәндерді есте сақтауы мүмкін. Кейін state өзгерсе де, ол ескі мәнді қолданса — stale closure.

Алдыңғы state қажет болғанда `setBooks((current) => ...)` түрі қолданылады. API effect-те ескі жауап cleanup-тағы `ignore` арқылы еленбейді. Toast effect-і `notice` өзгергенде қайта жасалып, бұрынғы таймерін тазалайды.

## 14. Re-render-ді не тудырады?

- Өз state-ының update болуы.
- Ата-анасының render болуы; соның ішінде жаңа props берілуі.
- Қолданылатын context мәнінің өзгеруі (Router context сияқты).

Re-render — бүкіл браузер бетін refresh жасау емес. React жаңа JSX-ті есептеп, өзгерген DOM бөліктерін commit кезеңінде ғана жаңартады.

## 15. Render vs commit

**Render:** компонент функциялары орындалып, жаңа UI қандай болатыны есептеледі. Render таза болуы керек: мұнда API-ға жазу немесе DOM өзгерту жасалмайды.

**Commit:** React есептелген өзгерістерді нақты DOM-ға қолданады. Effect-тер commit-тен кейін жоспарланады. Браузердің paint кезеңімен effect уақыты әрдайым бірдей емес, сондықтан `useEffect`-ті жай ғана «әрқашан paint-тен кейін» деп түсіндірме.

## 16. Keys, reconciliation және component identity

Карточкаларда:

```jsx
<BookCard key={book.id} ... />
```

React reconciliation кезінде type, position және key арқылы компоненттерді салыстырады. ID сұрыптағанда өзгермейді, сондықтан React қай кітап қайсысы екенін дұрыс сәйкестендіреді.

`key={Math.random()}` дұрыс емес: әр render-де жаңа key шығып, компоненттер қайта mount болуы мүмкін. `key={index}` те өзгеретін, сұрыпталатын кітаптар тізіміне дұрыс таңдау емес.

Loading skeleton-дағы index key қауіпсіз: ол ешқашан сұрыпталмайтын, дербес state-ы жоқ тұрақты декоративті тізім.

## 17. State preservation және reset

- Search жазғанда немесе pagination өзгергенде `Catalogue` сол компонент болып қалады, state сақталады.
- Discover пен Reading list үшін `key="discover"` және `key="reading-list"` әртүрлі. Олардың search/page күйі әдейі reset болады.
- Detail бетіне өтіп, қайта каталогқа кіргенде `Catalogue` қайта mount болады; сүзгілер default күйге келеді. URL-ға фильтр сақтайтын күрделі логика қосылмаған.
- `Add another book` батырмасы форманы `EMPTY_FORM` күйіне қайтарады.
- Browser refresh-тен кейін localStorage-дегі кітаптар мен saved IDs сақталады; уақытша search/form state сақталмайды.

## 18. Төрт UI күйі

| Күй     | Мысал                                                    |
| ------- | -------------------------------------------------------- |
| Loading | JSON/localStorage сұранысының 550 ms аралығында skeleton |
| Error   | Storage оқылмаса error және Try again / Restore          |
| Empty   | Search нәтижесі жоқ немесе reading list бос              |
| Success | Кітап қосылғаны туралы success, сақтау туралы toast      |

## 19. StrictMode не үшін?

`main.jsx` development режимінде `React.StrictMode` қолданады. React development-та effect-тің setup/cleanup циклін қосымша тексере алады. Сондықтан effect-тер қауіпсіз және cleanup дұрыс болуы керек. Бұл production-да кітапты екі рет қосады деген сөз емес: submit event handler-і effect ішінде емес, ал API оқу effect-інің ескі нәтижесі `ignore` арқылы еленбейді.

## 20. Қорғауда сұралуы мүмкін шағын өзгерістер

### Бір бетте 8 кітап көрсету

`src/data/constants.js`:

```js
export const PAGE_SIZE = 8;
```

### Author бойынша sort қосу

1. `FilterBar.jsx` ішіндегі select-ке option қос.
2. `Catalogue.jsx` ішіндегі sort бөлігіне қос:

```js
if (filters.sort === 'author') {
  sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
}
```

### Карточкаға жыл шығару

`BookCard.jsx` ішіне:

```jsx
<p className="card-author">
  {book.author} · {book.year}
</p>
```

### Жаңа controlled field қосу

1. `EMPTY_FORM` ішіне өріс қос.
2. `name`, `value`, `onChange` бар input жаз.
3. Қажет болса `validateForm` ішінде тексер.
4. `addBook` мәндерді spread арқылы алғандықтан, өріс объектіге түседі.
5. Detail бетінде жаңа өрісті көрсет.

### Reset action

Бар `resetFilters()` функциясын түсіндір: filters default күйге, page 1-ге өзгереді. Search, жанр, рейтинг және sort бірге тазарады.

### Қате жағдайын көрсету

`docs/TESTING.md` ішіндегі тек өз жоба storage key-ін бұзатын сценарийді қолдан. Қалыпты қолданушы деректерін жойып демонстрация жасама.

## 21. Алдымен қай файлдарды оқу керек?

1. `src/App.jsx` — ортақ state және route.
2. `src/pages/Catalogue.jsx` — тізімді өңдеу.
3. `src/components/BookCard.jsx` — props пен events.
4. `src/pages/AddBook.jsx` — controlled form және submit.
5. `src/api/booksApi.js` — асинхронды дерек көзі.
6. `src/components/Pagination.jsx` — бет нөмірлері.

Өзің бірнеше шағын өзгеріс жасап көр. Сонда қорғауда кодты түсіндіру әлдеқайда оңай болады.
