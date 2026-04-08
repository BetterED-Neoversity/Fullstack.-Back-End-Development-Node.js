import fs from 'fs'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function copyWithProcessing() {
  const readStream = fs.createReadStream('test.txt', {
    highWaterMark: 80,
    encoding: 'utf8',
  })

  const writeStream = fs.createWriteStream('output.txt')

  try {
    for await (const chunk of readStream) {
      await delay(500)
      writeStream.write(chunk)
      console.log(chunk)
    }
    writeStream.end()
    console.log('Копіювання завершено')
  } catch (err) {
    console.error('Помилка:', err.message)
    writeStream.destroy()
  }
}

copyWithProcessing()
