# finish

Готовий варіант: реєстрація/логін, пара access + refresh, оновлення та вихід. **Читання** рецептів/категорій/тегів/відгуків — без токена; **створення та зміна** — з заголовком `Authorization: Bearer <accessToken>`.

## Маршрути auth (`/api/auth`)

| Метод | Шлях | Що відбувається |
|-------|------|-----------------|
| `POST` | `/register` | bcrypt-хеш пароля, створення `User`, видача токенів, refresh у cookie |
| `POST` | `/login` | перевірка username/password, токени + cookie |
| `POST` | `/refresh` | refresh з cookie або `body.refreshToken`; ротація refresh у БД |
| `POST` | `/logout` | видалення refresh з БД, очистка cookie |

## Захист ресурсів

У роутерах [`recipes`](./src/routes/recipes.routes.ts), [`categories`](./src/routes/categories.routes.ts), [`tags`](./src/routes/tags.routes.ts), [`reviews`](./src/routes/reviews.routes.ts) middleware [`authenticate`](./src/middleware/authenticate.ts) стоїть на **POST / PATCH / DELETE**; `GET` залишаються публічними.

## Технічна реалізація

- [`app.ts`](./app.ts) — `cookie-parser`, [`auth.routes`](./src/routes/auth.routes.ts), ті самі ресурсні роутери що в `start/`.
- [`src/services/auth.ts`](./src/services/auth.ts) — `jwt.sign` для access, `crypto.randomBytes` для refresh, запис у `RefreshToken`, `setRefreshTokenCookie` (httpOnly, `sameSite: strict`).
- [`prisma/schema.prisma`](./prisma/schema.prisma) — `User`, `RefreshToken`, зв’язок з рецептами/відгуками за потреби курсу.
- Час життя токенів: [`src/constants/time.ts`](./src/constants/time.ts).
- Приклади HTTP: [`src/requests/auth.http`](./src/requests/auth.http).

## Запуск

```bash
npm install
copy .env.example .env   # JWT_SECRET, DATABASE_URL
npx prisma migrate dev
npm run dev
```

Swagger: `http://localhost:3000/api-docs`.
