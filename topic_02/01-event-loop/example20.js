import { readFile } from 'fs/promises'

try {
  await readFile('./file.txt', 'utf-8')

  setTimeout(() => {
    console.log('setTimeout')
  }, 0)

  setImmediate(() => {
    console.log('setImmediate')
  })
} catch (err) {
  console.error('Error reading file:', err)
}
