import fs from 'node:fs/promises'

const entries = await fs.readdir('.', { withFileTypes: true })

for (const entry of entries) {
  if (entry.isFile()) {
    console.log('Файл:', entry.name)
  } else if (entry.isDirectory()) {
    console.log('Директорія:', entry.name)
  }
}
