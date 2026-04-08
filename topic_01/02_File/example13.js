import fs from 'node:fs/promises'

try {
  await fs.unlink('temp.txt')
  console.log('Файл видалено')
} catch (error) {
  console.error('Помилка видалення файлу:', error.message)
}
