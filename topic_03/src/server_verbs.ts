import express, { Request, Response } from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Welcome to Express server!')
})

app.get('/api/books', (req, res) => {
  res.json([
    { title: 'Тіні забутих предків', author: 'Михайло Коцюбинський' },
    { title: 'Захар Беркут', author: 'Іван Франко' },
  ])
})

app.post('/api/books', (req, res) => {
  res.status(201).json({
    message: 'Book added successfully'
  })
})

app.patch('/api/books', (req, res) => {
  res.json({
    message: 'Book updated successfully'
  })
})

app.put('/api/books', (req, res) => {
  res.json({
    message: 'Book replaced successfully'
  })
})

app.delete('/api/books', (req, res) => {
  res.json({
    message: 'Book deleted successfully'
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})