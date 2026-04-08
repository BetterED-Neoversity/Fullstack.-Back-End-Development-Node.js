import { pipeline } from 'stream'
import fs from 'fs'
import zlib from 'zlib'

pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('output.gz'),
  (err) => {
    if (err) {
      console.error('Помилка в ланцюжку:', err.message)
    } else {
      console.log('Архів успішно створено')
    }
  },
)
