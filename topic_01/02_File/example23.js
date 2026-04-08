import fs from 'node:fs/promises'

try {
  // Перевірка на існування
  await fs.access('example.txt', fs.constants.F_OK)
  console.log('Файл існує')

  // Перевірка на можливість читання
  await fs.access('example.txt', fs.constants.R_OK)
  console.log('Файл можна читати')

  // Перевірка на можливість запису
  await fs.access('example.txt', fs.constants.W_OK)
  console.log('Файл можна змінювати')

  // Перевірка на можливість виконання
  await fs.access('example.txt', fs.constants.X_OK)
  console.log('Файл можна виконувати')
} catch (error) {
  console.error('Немає доступу:', error.message)
}
