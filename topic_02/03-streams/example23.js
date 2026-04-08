import { Readable } from 'stream'

function* numberGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield `Число ${i}`
  }
}

const stream = Readable.from(numberGenerator())

for await (const chunk of stream) {
  console.log(chunk)
}
