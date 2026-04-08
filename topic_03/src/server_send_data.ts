import express, { Request } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

interface Book {
  id: number
  title: string
  author: string
}

interface CreateBookBody {
  title: string
  author: string
}

interface UpdateBookBody {
  title?: string
  author?: string
}

const books: Book[] = [
  { id: 1, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський' },
  { id: 2, title: 'Захар Беркут', author: 'Іван Франко' },
  { id: 3, title: 'Кобзар', author: 'Тарас Шевченко' },
]

app.get('/api/books', (req, res) => {
  const author = req.query.author as string | undefined
  const sortBy = req.query.sortBy as string | undefined

  let result = [...books]

  if (author) {
    result = result.filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase()),
    )
  }

  if (sortBy === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  res.json(result)
})

app.get('/api/books/:id', (req: Request<{ id: string }>, res) => {
  const bookId = req.params.id
  const book = books.find((b) => b.id === parseInt(bookId))

  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ error: 'Book not found' })
  }
})

app.get(
  '/api/authors/:authorId/books/:bookId',
  (req: Request<{ authorId: string; bookId: string }>, res) => {
    const authorId = req.params.authorId
    const bookId = req.params.bookId

    res.json({
      message: 'Requested specific book from specific author',
      authorId: authorId,
      bookId: bookId,
    })
  },
)

app.post('/api/books', (req: Request<{}, {}, CreateBookBody>, res) => {
  const newBook: Book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  }
  books.push(newBook)
  res.status(201).json(newBook)
})

app.patch(
  '/api/books/:id',
  (req: Request<{ id: string }, {}, UpdateBookBody>, res) => {
    const bookId = parseInt(req.params.id)
    const book = books.find((b) => b.id === bookId)

    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    if (req.body.title) {
      book.title = req.body.title
    }

    if (req.body.author) {
      book.author = req.body.author
    }

    res.json(book)
  },
)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
