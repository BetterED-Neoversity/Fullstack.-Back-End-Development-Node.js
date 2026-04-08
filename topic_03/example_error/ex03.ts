import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

const books = [
  { id: 1, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський' },
  { id: 2, title: 'Захар Беркут', author: 'Іван Франко' },
  { id: 3, title: 'Кобзар', author: 'Тарас Шевченко' },
]

class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly isOperational = true,
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }
}

app.get('/api/books/:id', (req: Request<{ id: string }>, res: Response) => {
  const bookId = parseInt(req.params.id)

  if (isNaN(bookId)) {
    throw new AppError('Book ID must be a number', 400)
  }

  const book = books.find((b) => b.id === bookId)

  if (!book) {
    throw new AppError(`Book with id ${bookId} not found`, 404)
  }

  res.json(book)
})

app.post('/api/books', (req: Request, res: Response) => {
  if (!req.body.title || !req.body.author) {
    throw new AppError('Title and author are required', 400)
  }

  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  }

  books.push(newBook)
  res.status(201).json(newBook)
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof AppError ? err.status : 500
  const message =
    err instanceof AppError && err.isOperational
      ? err.message
      : 'Internal server error'

  console.error(`[${err.constructor.name}] ${status}: ${err.message}`)

  res.status(status).json({
    error: {
      message,
      status,
    },
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
