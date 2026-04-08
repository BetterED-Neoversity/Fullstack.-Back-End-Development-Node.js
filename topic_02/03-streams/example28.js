import fs from 'fs'

console.log('Початкове споживання:')
console.log(process.memoryUsage())

const stream = fs.createReadStream('large.txt')

stream.on('data', (chunk) => {
  // Обробляємо chunk, але не зберігаємо його
})

stream.on('end', () => {
  console.log('\nПісля обробки через stream:')
  console.log(process.memoryUsage())
})
