import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Вказуємо, який шаблонізатор використовувати
app.set('view engine', 'ejs')

// Вказуємо директорію з шаблонами (за замовчуванням це views/)
app.set('views', path.join(__dirname, 'views'))

interface Book {
  id: number
  title: string
  author: string
  year: number
}

const books: Book[] = [
  { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
  {
    id: 2,
    title: 'Тіні забутих предків',
    author: 'Михайло Коцюбинський',
    year: 1911,
  },
  {
    id: 3,
    title: 'Маруся',
    author: "Григорій Квітка-Основ'яненко",
    year: 1834,
  },
]

app.get('/', (req, res) => {
  res.render('index', { title: 'Головна' })
})

app.get('/books', (req, res) => {
  res.render('books', { books: books })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
