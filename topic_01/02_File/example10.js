import fs from 'node:fs/promises'

const buffer = await fs.readFile('example.txt')
console.log(buffer) // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
console.log(buffer.toString()) // Hello World
