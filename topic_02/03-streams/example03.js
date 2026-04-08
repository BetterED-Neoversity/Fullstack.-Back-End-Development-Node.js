import fs from 'fs'

// Читаємо тільки перші 100 байтів
const read = fs.createReadStream('test.txt', {
  start: 0,
  end: 99,
  encoding: 'utf8',
})

read.on('data', (chunk) => {
  console.log('Початок файлу:', chunk)
})

read.on('end', () => {
  console.log('Прочитано перші 100 байтів')
})
