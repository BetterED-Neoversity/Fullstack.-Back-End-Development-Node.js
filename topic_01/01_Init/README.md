# 01_Init

Навчальні приклади для старту з Node.js: запуск проєкту, модулі `CommonJS` та `ES Modules`, імпорт/експорт, базове налаштування `package.json`.

## Файли прикладів

- [`package.json`](./package.json) - конфігурація npm-проєкту, скрипти запуску та залежності (`dayjs`, `nodemon`).
- [`index.js`](./index.js) - приклад підключення сторонньої бібліотеки `dayjs` у `CommonJS` і форматування дати.
- [`math.js`](./math.js) - експорт функцій `add`/`subtract` через `module.exports`.
- [`main.js`](./main.js) - імпорт із `math.js` через `require()` і використання функцій у `CommonJS`.
- [`logger.mjs`](./logger.mjs) - `default export` у форматі `ESM`.
- [`math.mjs`](./math.mjs) - іменовані експорти та окремий експорт константи `PI` у `ESM`.
- [`main.mjs`](./main.mjs) - імпорт іменованих експортів із `math.mjs`.
- [`index.mjs`](./index.mjs) - приклад одночасного використання `default` та namespace-імпорту (`import * as`).
