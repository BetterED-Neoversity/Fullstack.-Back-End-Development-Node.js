import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = 3000

interface Book {
  id: number
  title: string
  author: string
}

const books: Book[] = [
  { id: 1, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський' },
  { id: 2, title: 'Захар Беркут', author: 'Іван Франко' },
  { id: 3, title: 'Кобзар', author: 'Тарас Шевченко' },
]

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Creating book: ${req.body.title}`)
  next()
}

const checkBookData = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({
      error: 'Title and author are required',
    })
  }
  next()
}

const checkDuplicates = (req: Request, res: Response, next: NextFunction) => {
  const exists = books.find(
    (b) => b.title.toLowerCase() === req.body.title.toLowerCase(),
  )

  if (exists) {
    return res.status(409).json({
      error: 'Book with this title already exists',
    })
  }
  next()
}

app.post(
  '/api/books',
  logRequest,
  checkBookData,
  checkDuplicates,
  (req: Request, res: Response) => {
    const newBook: Book = {
      id: books.length + 1,
      title: req.body.title,
      author: req.body.author,
    }

    books.push(newBook)
    res.status(201).json(newBook)
  },
)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
