import fs from 'fs/promises'

async function readFileSafely(filePath) {
  try {
    await fs.access(filePath, fs.constants.R_OK)
    const content = await fs.readFile(filePath, 'utf8')
    return content
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Файл не знайдено')
    } else if (error.code === 'EACCES') {
      console.error('Немає прав на читання файлу')
    } else {
      console.error('Інша помилка:', error.message)
    }
    return null
  }
}

// Приклад використання
const filePath = 'example.txt'
const content = await readFileSafely(filePath)
console.log('Вміст файлу:', content)
