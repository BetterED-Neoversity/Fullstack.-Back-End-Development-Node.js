import { finished } from 'stream/promises'
import fs from 'fs'

async function processFile() {
  const writeStream = fs.createWriteStream('log.txt')

  // Запускаємо запис даних
  setInterval(() => {
    writeStream.write(`Запис о ${new Date().toISOString()}\n`)
  }, 1000)

  // Через 5 секунд закриваємо stream
  setTimeout(() => writeStream.end(), 5000)

  // Чекаємо поки stream закриється
  await finished(writeStream)

  console.log('Логування завершено, файл закрито')

  // Тепер можна безпечно читати файл
  const content = await fs.promises.readFile('log.txt', 'utf8')
  console.log('Вміст файлу:', content)
}

processFile()
