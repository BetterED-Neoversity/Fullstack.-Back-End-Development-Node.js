import { Readable } from 'stream'

const stream = Readable.from(['один', 'два', 'три', 'чотири'])

stream.on('data', (chunk) => {
  console.log('Chunk:', chunk)
})
