import express from 'express'

const app = express()

interface Book {
  id: number
  title: string
  author: string
  year: number
}

const books: Book[] = [
  { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
  {
    id: 2,
    title: 'Тіні забутих предків',
    author: 'Михайло Коцюбинський',
    year: 1911,
  },
  {
    id: 3,
    title: 'Маруся',
    author: "Григорій Квітка-Основ'яненко",
    year: 1834,
  },
]

app.get('/books', (req, res) => {
  let html =
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Книги</title></head><body>'
  html += '<h1>Каталог книг</h1><ul>'

  for (const book of books) {
    html +=
      '<li><strong>' +
      book.title +
      '</strong> - ' +
      book.author +
      ' (' +
      book.year +
      ')</li>'
  }

  html += '</ul></body></html>'
  res.send(html)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
