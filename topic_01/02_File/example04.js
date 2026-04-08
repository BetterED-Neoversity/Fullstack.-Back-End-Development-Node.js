process.on('exit', (code) => {
  console.log(`Код завершення: ${code}`)
})

if (!process.argv[2]) {
  console.error('Не вказано файл')
  process.exit(1)
}

console.log('Робота завершена успішно')
process.exit(0)
