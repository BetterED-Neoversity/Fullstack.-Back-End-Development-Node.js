import fs from 'fs'
import zlib from 'zlib'

const file = 'test.txt'

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('test.gz'))
  .on('close', () => {
    console.log('Архів створено')
  })
