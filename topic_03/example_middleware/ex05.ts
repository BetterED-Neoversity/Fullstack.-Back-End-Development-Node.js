import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = 3000

app.use(
  (
    req: Request & { requestTime?: string },
    res: Response,
    next: NextFunction,
  ) => {
    req.requestTime = new Date().toISOString()
    next()
  },
)

app.get(
  '/api/books',
  (req: Request & { requestTime?: string }, res: Response) => {
    res.json({
      requestTime: req.requestTime,
      books: [
        {
          id: 1,
          title: 'Тіні забутих предків',
          author: 'Михайло Коцюбинський',
        },
      ],
    })
  },
)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
