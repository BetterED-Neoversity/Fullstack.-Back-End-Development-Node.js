import fs from 'fs/promises'

console.log('Початкове споживання:')
console.log(process.memoryUsage())

// Читаємо файл розміром 100 MB
const content = await fs.readFile('large.txt')

console.log('\nПісля завантаження файлу:')
console.log(process.memoryUsage())
