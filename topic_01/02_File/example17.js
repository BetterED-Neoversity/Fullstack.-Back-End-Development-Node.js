import fs from 'node:fs/promises'

const entries = await fs.readdir('.', { withFileTypes: true })

const textFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.txt'))
  .map((entry) => entry.name)

console.log('Текстові файли:', textFiles)
