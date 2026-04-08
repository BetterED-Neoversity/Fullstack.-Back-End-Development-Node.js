import fs from 'fs'

const read = fs.createReadStream('test.txt')

read.on('data', (chunk) => {
  console.log('Дані отримано')
})

read.on('end', () => {
  console.log('1. Всі дані прочитано')
})

read.on('close', () => {
  console.log('2. Stream закрито, ресурси звільнено')
})
