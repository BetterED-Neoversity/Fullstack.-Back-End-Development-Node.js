import fs from 'fs'

const stream = fs.createReadStream('large.txt', {
  highWaterMark: 80,
  encoding: 'utf8',
})

try {
  for await (const chunk of stream) {
    console.log(chunk)
  }
  console.log('Файл прочитано')
} catch (err) {
  console.error('Помилка:', err.message)
}
