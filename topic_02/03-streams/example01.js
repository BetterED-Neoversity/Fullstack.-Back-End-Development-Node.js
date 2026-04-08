import fs from 'fs'

const read = fs.createReadStream('test.txt')

read.on('data', (chunk) => {
  console.log(chunk.toString())
})

read.on('end', () => {
  console.log('Файл закінчився')
})
