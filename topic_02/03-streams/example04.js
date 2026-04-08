import fs from 'fs'

const read = fs.createReadStream('nonexistent.txt')

read.on('data', (chunk) => {
  console.log(chunk.toString())
})

read.on('error', (err) => {
  console.log('Помилка читання файлу:', err.message)
})

read.on('end', () => {
  console.log('Файл прочитано')
})
