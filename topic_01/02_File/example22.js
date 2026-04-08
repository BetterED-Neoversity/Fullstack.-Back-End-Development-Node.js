import fs from 'node:fs/promises'

try {
  await fs.access('example1.txt')
  console.log('Файл існує і доступний')
} catch (error) {
  console.log('Файл не існує або недоступний', error)
}
