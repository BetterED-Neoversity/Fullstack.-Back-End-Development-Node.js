## Production-залежності

```bash
npm install express socket.io
npm install @prisma/client @prisma/adapter-pg
npm install zod
npm install pino pino-http
npm install bcrypt
npm install cookie-parser cookie
npm install http-errors
```

Що для чого:

- `express`, `socket.io` — каркас.
- `@prisma/client`, `@prisma/adapter-pg` — робота з PostgreSQL через Prisma 7.
- `zod` — валідація payload подій (як у попередніх темах).
- `pino`, `pino-http` — логування.
- `bcrypt` — хешування паролів для реєстрації.
- `cookie-parser` — парсинг cookie в Express.
- `cookie` — парсинг cookie в Socket.IO middleware (під час handshake).
- `http-errors` — створення HTTP-помилок (як у попередніх темах).

## Dev-залежності

```bash
npm install -D typescript tsx
npm install -D prisma
npm install -D @types/express @types/node @types/bcrypt @types/cookie-parser @types/http-errors
npm install -D pino-pretty
```

Що для чого:

- `typescript`, `tsx` — компіляція і запуск (як завжди).
- `prisma` — CLI для міграцій і генерації клієнта.
- Типи для всіх пакетів, які не мають вбудованих. Socket.IO, Zod, Pino, Cookie мають вбудовані типи, тому окремих `@types/...` для них не ставимо.
- `pino-pretty` — читабельне форматування логів у dev.

## Що робимо одразу після встановлення

```bash
npx prisma init --datasource-provider postgresql
```

Створює `prisma/schema.prisma` і `.env` з заготовкою `DATABASE_URL`. У наступних кроках ми сюди додамо моделі `User`, `Session`, `Message`.
