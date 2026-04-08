import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

const books = [
  { id: 1, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський' },
]

app.get('/api/books/:id', (req: Request<{ id: string }>, res: Response) => {
  const bookId = parseInt(req.params.id)
  const book = books.find((b) => b.id === bookId)

  if (!book) {
    const error = new Error('Book not found')
    throw error
  }

  res.json(book)
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = (err as any).status || 500
  const message = err.message || 'Internal server error'

  console.error(`[ERROR] ${status}: ${message}`)

  res.status(status).json({
    error: message,
    status: status,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
