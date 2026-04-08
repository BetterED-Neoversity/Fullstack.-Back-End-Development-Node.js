import fs from 'node:fs/promises'

try {
  const stats = await fs.stat('example.txt')
  console.log('Статистика файлу:', stats)
} catch (error) {
  console.error('Помилка отримання статистики:', error.message)
}

const stats = await fs.stat('example.txt')

console.log('Розмір (байти):', stats.size)
console.log('Створено:', stats.birthtime)
console.log('Змінено:', stats.mtime)
console.log('Це файл?', stats.isFile())
console.log('Це директорія?', stats.isDirectory())
