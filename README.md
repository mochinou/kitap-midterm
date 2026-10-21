# Kitap — Find your next chapter

React midterm project: **кітаптар каталогы**. Интерфейс ағылшынша, түсіндірме қазақша.

Код JavaScript пен кәдімгі CSS арқылы жазылған. Redux, TypeScript, UI framework немесе бөлек backend жоқ.

## Жылдам іске қосу

**Node.js 20.19+ немесе 22.12+** орнатылған болсын.

ZIP-ті ашып, `kitap` бумасында терминалды аш:

```bash
npm ci
npm run dev
```

Терминалда көрсетілген мекенжайды браузерде аш. Әдетте: `http://localhost:5173`.

Қалған командалар:

```bash
npm run check    # JSON-да 100+ кітап, бірегей ID және дұрыс өрістер барын тексеру
npm run build    # production нұсқасын dist/ бумасына жинау
npm run preview  # жиналған нұсқаны жергілікті тексеру
```

`node_modules` ZIP-ке кірмейді: оны `npm ci` орнатады. `index.html` файлын екі рет басып ашпай, Vite серверін қолдан.

`books.json` файлын өзгертсең, бұрын сақталған localStorage дерегі автоматты ауыспайды. Тек өз тест дерегіңді тазалау үшін DevTools-та `localStorage.removeItem('kitap.books.v1')` орындап, бетті қайта аш. Reading list бөлек key-де сақталады.

## Не жұмыс істейді?

- 120 бастапқы кітап, 8 жанр.
- Атауы, авторы және сипаттамадағы сөздер бойынша іздеу.
- Жанр және ең төменгі рейтинг бойынша сүзу.
- Featured, рейтинг, A–Z, жаңа/ескі жариялану жылы бойынша сұрыптау.
- Әр бетте 12 кітаптан pagination.
- Кітаптың жеке detail беті және сол жанрдағы ұсыныстар.
- Жаңа кітап қосатын controlled form және өрістерді тексеру.
- Reading list-ке сақтау және одан алып тастау.
- Loading, error, empty және success күйлері.
- Refresh жасағанда кітаптар мен reading list жоғалмайды.
- Телефон, планшет және компьютерге бейімделетін дизайн.
- Қате URL үшін 404 көрінісі.

## Қолданылған құралдар

- React 18: компоненттер, props, `useState`, `useEffect`, `useRef`.
- React Router 7: SPA ішіндегі беттер.
- Vite 6: development server және production build.
- CSS: responsive layout, Grid, Flexbox.
- JSON + Promise + delay + localStorage: simulated API.

## Беттер

| URL               | Мақсаты                          |
| ----------------- | -------------------------------- |
| `/`               | Негізгі каталог                  |
| `/reading-list`   | Сақталған кітаптар               |
| `/books/book-016` | Бір кітаптың detail бетіне мысал |
| `/add`            | Жаңа кітап қосу                  |

## Бумалар

```text
kitap/
├── public/
│   ├── fonts/                 # Жергілікті қаріптер және OFL лицензиялары
│   ├── _redirects             # Netlify-де SPA беттерін refresh жасау
│   └── favicon.svg
├── src/
│   ├── api/booksApi.js        # JSON/localStorage-пен жұмыс істейтін simulated API
│   ├── components/            # Қайта қолданылатын UI компоненттері
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
│   │   ├── books.json         # 120 толық бастапқы жазба
│   │   └── constants.js       # Жанрлар, мұқаба түстері, PAGE_SIZE
│   ├── pages/
│   │   ├── Catalogue.jsx      # Search → filter → sort → pagination
│   │   ├── BookDetails.jsx
│   │   └── AddBook.jsx
│   ├── App.jsx                # Ортақ state және routes
│   ├── main.jsx               # React-ті іске қосу
│   └── styles.css
├── docs/
│   ├── QORGAU.md              # Код пен теорияны қазақша түсіндіру
│   ├── REQUIREMENTS.md        # PDF талаптарының қай жерде орындалғаны
│   └── TESTING.md             # Қолмен тексеру сценарийлері
├── scripts/check-data.mjs
├── netlify.toml
├── vercel.json
├── vite.config.js
└── package.json
```

## Simulated API қалай жұмыс істейді?

Негізгі дерек көзі — `src/api/booksApi.js`.

1. `getBooks()` Promise арқылы 550 ms күтеді.
2. Бірінші ашылғанда JSON-дағы 120 кітап localStorage-ке жазылады.
3. Кейінгі ашылуларда сол браузерде сақталған дерек оқылады.
4. `addBook()` 650 ms күтеді, UUID береді, жаңа кітапты localStorage-ке сақтайды.
5. Сақтау сәтті болса ғана React state жаңартылады.

Storage keys:

```text
kitap.books.v1
kitap.reading-list.v1
```

**Маңызды шектеу:** бұл ортақ серверлік база емес. Әр браузердің және әр доменнің өз дерегі бар. Бір браузерде қосылған кітап басқа адамның браузерінде көрінбейді. Localhost пен deployed сайттың storage-і де бөлек. Бөлек backend, API key немесе интернеттегі кітап сервисі қажет емес.

Рейтингтер — simulated demo values; бет саны басылымға байланысты өзгеруі мүмкін. Сипаттамалар қысқаша таныстыру үшін жазылған. Мұқабалар — осы жобаға арналған SVG/CSS дизайндары, нақты баспалардың ресми мұқабалары емес. Қаріптер жергілікті файлдардан жүктеледі.

## Міндетті: тұрақты public deploy

PDF тек localhost-та жұмыс істейтін жобаны қабылдамайды. **Уақытша live preview тұрақты submission link-тің орнына жүрмейді.** Код пен build дайын; өз аккаунтыңдағы repository және тұрақты public URL бөлек жариялануы керек.

### Ең оңай жол: Netlify Drop

1. Жоба бумасында `npm ci`, одан кейін `npm run build` орында.
2. `https://app.netlify.com/drop` ашып, өз аккаунтыңа кір.
3. Дайын **`dist` бумасын** жүкте. Source бумасын емес.
4. Netlify берген `https://...netlify.app` сілтемесін көшір.
5. Сайтты private/incognito терезесінде ашып тексер.
6. `/books/book-016` мекенжайын тікелей ашып, refresh жасап тексер.

Егер дайын **`kitap-deploy.zip`** архивін қолдансаң, оны ашып, ішіндегі `kitap-site` бумасын Netlify Drop-қа жүктей аласың. Кодты өзгертсең, build-ті қайта жинау керек.

`public/_redirects` файлы build кезінде `dist` ішіне көшеді; ол detail/add/reading-list URL-дарын refresh жасағанда 404 шықпауын қамтамасыз етеді.

### Repository арқылы Netlify немесе Vercel

1. Өз аккаунтыңда жаңа public GitHub repository құр.
2. Осы source файлдарын жүкте. `node_modules/` пен `dist/` қажет емес.
3. Netlify/Vercel ішінде repository-ді таңда.
4. Build command: `npm run build`.
5. Output/publish directory: `dist`.
6. Environment variables қажет емес.
7. Жарияланған сайтты және detail URL refresh-ін тексер.

Netlify үшін `netlify.toml`, Vercel үшін `vercel.json` дайын.

## Тапсыру алдында

- [ ] Кодты оқып, атауларын, түстерін немесе деректерін өзіңе бейімдедім.
- [ ] `npm run check` және `npm run build` сәтті аяқталды.
- [ ] Public repository link дайын.
- [ ] Тұрақты deployed application link дайын.
- [ ] Сайт басқа браузерден және телефоннан ашылады.
- [ ] Жеке detail URL refresh-тен кейін де ашылады.
- [ ] `docs/QORGAU.md` ішіндегі сұрақтарға жауап бере аламын.
- [ ] Repository link пен application link-ті тапсырып, дедлайнға дейін **Turn in** бастым.

Алдымен кодты түсініп ал: қорғауда шағын өзгеріс жасау сұралуы мүмкін. Негізгі түсіндірме — `docs/QORGAU.md`.
