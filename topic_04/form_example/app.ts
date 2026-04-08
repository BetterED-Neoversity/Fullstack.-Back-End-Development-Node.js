import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Віддаємо статичні файли
app.use(express.static(path.join(__dirname, 'public')))

// Middleware для парсингу даних форм
app.use(express.urlencoded({ extended: true }))

interface User {
  username: string
  email: string
  age: number
}

interface RegisterBody {
  username: string
  email: string
  age: string
}

// Масив для зберігання користувачів
const users: User[] = []

// Маршрут для головної сторінки
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Маршрут для сторінки реєстрації
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'))
})

// Обробник POST запиту
app.post('/register', (req, res) => {
  const body = req.body as RegisterBody

  const user: User = {
    username: body.username.trim(),
    email: body.email.trim().toLowerCase(),
    age: parseInt(body.age, 10),
  }

  users.push(user)
  res.redirect('/success')
})

app.get('/success', (req, res) => {
  res.send(
    '<h1>Реєстрація успішна!</h1><a href="/">На головну</a> | <a href="/register">Зареєструвати ще одного</a>',
  )
})

// Маршрут для сторінки пошуку
app.get('/search', (req, res) => {
  const { q } = req.query as { q: string }

  if (!q) {
    return res.sendFile(path.join(__dirname, 'public', 'search.html'))
  }

  const results = users.filter((user) =>
    user.username.toLowerCase().includes(q.toLowerCase()),
  )

  res.send(`Знайдено користувачів: ${results.length}`)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
