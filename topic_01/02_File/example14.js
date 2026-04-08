import fs from 'node:fs/promises'

try {
  await fs.unlink('nonexistent.txt')
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('Файл не існує')
  } else {
    console.error('Інша помилка:', error.message)
  }
}
