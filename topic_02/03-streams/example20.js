import fs from 'fs'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function processLog() {
  const stream = fs.createReadStream('users.jsonl', {
    highWaterMark: 80,
    encoding: 'utf8',
  })

  try {
    for await (const chunk of stream) {
      console.log('Обробляємо chunk:', chunk.length, 'байт')

      // Симуляція повільної обробки
      await delay(500)

      console.log('Chunk оброблено', chunk)
    }
    console.log('Весь лог оброблено')
  } catch (err) {
    console.error('Помилка обробки:', err.message)
  }
}

processLog()
