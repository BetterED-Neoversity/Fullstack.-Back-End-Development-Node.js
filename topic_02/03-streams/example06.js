import fs from 'fs'

const write = fs.createWriteStream('output.txt')

write.write('Перший рядок\n')
write.write('Другий рядок\n')
write.write('Третій рядок\n')

write.end('Останній рядок\n')
