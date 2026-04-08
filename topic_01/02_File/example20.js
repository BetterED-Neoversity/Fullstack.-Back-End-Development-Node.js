import fs from 'node:fs/promises'

const stats = await fs.stat('example.txt')
const sizeInKB = (stats.size / 1024).toFixed(2)
const sizeInMB = (stats.size / 1024 / 1024).toFixed(2)

console.log(
  `Розмір файлу: ${stats.size} байтів (${sizeInKB} KB, ${sizeInMB} MB)`,
)
