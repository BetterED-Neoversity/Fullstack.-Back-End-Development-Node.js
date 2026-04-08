import fs from 'fs'

const write = fs.createWriteStream('output.txt')

write.write('Дані для запису\n')
write.end()

write.on('finish', () => {
  console.log('Всі дані записано на диск')
})
