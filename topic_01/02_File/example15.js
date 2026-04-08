import fs from 'node:fs/promises'

try {
  const files = await fs.readdir('.')
  console.log('Файли в поточній директорії:', files)
} catch (error) {
  console.error('Помилка читання директорії:', error.message)
}
