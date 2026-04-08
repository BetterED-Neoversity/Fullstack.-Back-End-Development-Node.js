import fs from 'node:fs/promises'

try {
  await fs.writeFile('output.txt', 'Це новий вміст файлу')
  console.log('Файл успішно записано')
} catch (error) {
  console.error('Помилка запису файлу:', error.message)
}
