import { Readable } from 'stream'

async function* fetchData() {
  const ids = [1, 2, 3, 4, 5]

  for (const id of ids) {
    // Симуляція запиту до API
    await new Promise((resolve) => setTimeout(resolve, 500))
    yield { id, data: `Дані для ID ${id}` }
  }
}

const stream = Readable.from(fetchData())

for await (const record of stream) {
  console.log(record)
}
