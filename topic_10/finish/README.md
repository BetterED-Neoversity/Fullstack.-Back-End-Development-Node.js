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

## Тести

Проєкт розширено тестами на [`Vitest`](./vitest.config.ts) + [`Supertest`](./tests/routes/recipes.test.ts). Тести працюють з окремою тестовою БД з `TEST_DATABASE_URL`; перед кожним тестом база очищається через [`tests/setup.ts`](./tests/setup.ts) і [`tests/helpers/db.ts`](./tests/helpers/db.ts).

Покриття включає:

- [`tests/routes/auth.test.ts`](./tests/routes/auth.test.ts) — реєстрація, конфлікт username/email, валідація, login з правильними/неправильними credentials.
- [`tests/routes/auth.mock.test.ts`](./tests/routes/auth.mock.test.ts) — login з моком `bcrypt.compare` і перевірка створення refresh token.
- [`tests/routes/recipes.test.ts`](./tests/routes/recipes.test.ts) — читання рецептів, отримання за `id`, створення/оновлення/видалення з access token, 401/403/404 сценарії.
- [`tests/validators/recipe.test.ts`](./tests/validators/recipe.test.ts) — валідація payload для рецепта.
- [`tests/sanity.test.ts`](./tests/sanity.test.ts) — перевірка, що тести використовують тестовий `DATABASE_URL`.

Корисні команди:

```bash
npm run db:migrate:test
npm test
npm run test:coverage
```

## Запуск

```bash
npm install
copy .env.example .env   # JWT_SECRET, DATABASE_URL
npx prisma migrate dev
npm run dev
```

Swagger: `http://localhost:3000/api-docs`.
