import express, { Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Всі статичні файли доступні за префіксом /static
app.use(
  '/static',
  express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: true,
  }),
)

// Якщо статичний файл не знайдено, цей маршрут спрацює
app.use((req: Request, res: Response) => {
  res.status(404).send('Сторінку не знайдено')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/static')
})
