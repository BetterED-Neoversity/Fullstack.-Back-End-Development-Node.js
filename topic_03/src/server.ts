import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = 3000

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/api/books', (req: Request, res: Response) => {
  res.send([
    { id: 1, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський' },
  ])
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
