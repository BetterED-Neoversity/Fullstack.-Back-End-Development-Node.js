import express, { Request, Response } from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Welcome to Express server!')
})

app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})