# Орындалған тексерулер

2026-10-20. Production build Vite preview серверінде Chromium арқылы тексерілді.

| Тексеру                                        | Нәтиже                                    |
| ---------------------------------------------- | ----------------------------------------- |
| `npm run check`                                | PASS: 120 жазба, 8 жанр, бірегей ID/title |
| `npm run build`                                | PASS                                      |
| `npm audit --audit-level=moderate`             | 0 vulnerabilities                         |
| Prettier formatting check                      | PASS                                      |
| Loading skeleton және disabled controls        | PASS                                      |
| Case-insensitive author search + trim          | PASS: Matt Haig → 1 кітап                 |
| Search empty state + clear                     | PASS                                      |
| Fantasy filter                                 | PASS: 15 кітап                            |
| Fantasy, page 2                                | PASS: 3 кітап, 13–15 of 15                |
| Fantasy + rating 4.5                           | PASS: 9 кітап, page reset                 |
| Title / rating / newest / oldest sort          | PASS                                      |
| Last page                                      | PASS: 109–120, Next disabled              |
| Rating 4.0 + page reset                        | PASS: 111 кітап, page 1                   |
| Save/remove + reading list refresh persistence | PASS                                      |
| Saved page 2-дегі соңғы кітапты remove         | PASS: 12 кітапқа түсіп, бар бетке қайтады |
| Empty reading list                             | PASS                                      |
| Detail page                                    | PASS                                      |
| Empty form validation                          | PASS                                      |
| Add controlled form + success                  | PASS: 121 кітап, numeric year/pages, UUID |
| Newly added book direct URL + refresh          | PASS                                      |
| Corrupt storage error + retry + restore        | PASS: 120 кітапқа қалпына келді           |
| Unknown book / unknown route                   | PASS                                      |
| Responsive widths 320 / 375 / 768 / 1440       | PASS: 2 / 2 / 3 / 4 columns               |
| Mobile page overflow                           | PASS: viewport пен document ені бірдей    |
| Mobile detail / add form overflow              | PASS                                      |
| Production browser console                     | 0 errors, 0 warnings                      |

Тестте қосылған кітап пен bookmark-тар тазаланды. Бастапқы JSON өзгермеген: 120 кітап.

**Шектеу:** Netlify/Vercel public deployment бұл ортада жарияланған жоқ, сондықтан тұрақты public domain-де тексеру әлі орындалмаған. Жариялаған соң, сол доменде негізгі сценарийлерді және detail URL refresh-ін қайталау қажет. Бұл есеп толық automated unit/integration test suite емес; seed validation, build, audit және браузерлік тексерулердің қысқаша нәтижесі.
