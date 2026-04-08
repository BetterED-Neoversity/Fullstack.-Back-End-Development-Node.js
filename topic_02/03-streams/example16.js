import fs from 'fs'
import zlib from 'zlib'

const readStream = fs.createReadStream('input.txt')
const gzipStream = zlib.createGzip()
const writeStream = fs.createWriteStream('output.gz')

readStream.pipe(gzipStream).pipe(writeStream)

readStream.on('error', (err) => {
  console.error('Помилка читання:', err.message)
})

gzipStream.on('error', (err) => {
  console.error('Помилка стиснення:', err.message)
})

writeStream.on('error', (err) => {
  console.error('Помилка запису:', err.message)
})
