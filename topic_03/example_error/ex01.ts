import express, { Request, Response } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

interface Book {
  id: number
  title: string
  author: string
}

const books: Book[] = [
  { id: 1, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський' },
  { id: 2, title: 'Захар Беркут', author: 'Іван Франко' },
]

app.get('/api/books/:id', (req: Request<{ id: string }>, res: Response) => {
  const bookId = parseInt(req.params.id)
  const book = books.find((b) => b.id === bookId)

  // Спроба звернутись до властивості  об'єкта, що не існує
  const title = book!.title.toUpperCase()

  res.json({ title })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
