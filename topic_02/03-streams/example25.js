import { finished } from 'stream/promises'
import fs from 'fs'

const writeStream = fs.createWriteStream('output.txt')

writeStream.write('Перший рядок\n')
writeStream.write('Другий рядок\n')
writeStream.end('Останній рядок\n')

await finished(writeStream)
console.log('Файл повністю записано і закрито')
