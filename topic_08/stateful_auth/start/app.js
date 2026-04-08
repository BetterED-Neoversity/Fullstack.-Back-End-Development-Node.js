import express from 'express'
import path from 'path'
import prisma from './lib/prisma.js'

const app = express()
const PORT = 3000

// Middleware
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', {
    message: 'Сторінку не знайдено',
  })
})

// Error Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).render('error')
})

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})
