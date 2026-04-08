import fs from 'node:fs/promises'

// const stats = await fs.stat('example.txt')
const stats = await fs.stat('test')

console.log('Права (десяткова):', stats.mode)
console.log('Права (вісімкова):', stats.mode.toString(8))

const permissions = (stats.mode & 0o777).toString(8)
console.log('Права доступу:', permissions)
