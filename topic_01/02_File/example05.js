import path from 'node:path'

const fullPath = '/home/user/documents/report.txt'

console.log('Директорія:', path.dirname(fullPath))
console.log('Назва файлу:', path.basename(fullPath))
console.log('Розширення:', path.extname(fullPath))
