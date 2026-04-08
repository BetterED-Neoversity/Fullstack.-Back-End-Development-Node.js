import fs from 'node:fs/promises'

try {
  const data = await fs.readFile('example.txt', 'utf8')
  console.log('Вміст файлу:', data)
} catch (error) {
  console.error('Помилка читання файлу:', error.message)
}
