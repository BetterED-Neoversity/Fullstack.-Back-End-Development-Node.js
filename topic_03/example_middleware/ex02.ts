import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = 3000

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware 1')
  next()
})

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware 2')
  next()
})

app.get('/api/books', (req: Request, res: Response) => {
  console.log('Route handler')
  res.json({ message: 'Books list' })
})

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware 3')
  next()
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
