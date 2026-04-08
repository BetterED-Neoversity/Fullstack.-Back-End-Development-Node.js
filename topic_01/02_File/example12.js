import fs from 'node:fs/promises'

try {
  await fs.appendFile('log.txt', 'Новий запис у лозі\n')
  console.log('Дані додано до файлу')
} catch (error) {
  console.error('Помилка додавання до файлу:', error.message)
}

await fs.appendFile('log.txt', 'Перший Запис')
await fs.appendFile('log.txt', 'Другий Запис')

await fs.appendFile('log.txt', 'Перший Запис\n')
await fs.appendFile('log.txt', 'Другий Запис\n')
