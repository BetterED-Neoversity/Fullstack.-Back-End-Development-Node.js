import fs from 'fs'

const read = fs.createReadStream('test.txt', {
  highWaterMark: 1024, // читаємо по 1 кілобайту
})

let counter = 0
read.on('data', (chunk) => {
  counter++
  console.log(`Chunk #${counter}, розмір: ${chunk.length} байт`)
})
