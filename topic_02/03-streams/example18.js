import { pipeline } from 'stream/promises'
import fs from 'fs'
import zlib from 'zlib'

try {
  await pipeline(
    fs.createReadStream('test.txt'),
    zlib.createGzip(),
    fs.createWriteStream('output.gz'),
  )
  console.log('Архів успішно створено')
} catch (err) {
  console.error('Помилка в ланцюжку:', err.message)
}
