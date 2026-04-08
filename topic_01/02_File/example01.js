import os from 'node:os'

console.log('Платформа:', os.platform())
console.log('Архітектура:', os.arch())
console.log('Домашня тека користувача:', os.homedir())
console.log('Кількість процесорів:', os.cpus().length)
console.log(
  'Загальний обсяг пам’яті (МБ):',
  Math.round(os.totalmem() / 1024 / 1024),
)
console.log('Тимчасова директорія:', os.tmpdir())
