import stream from 'stream'

class MyWritableStream extends stream.Writable {
  constructor(options) {
    super(options)
    this.dataCount = 0
  }

  _write(chunk, encoding, callback) {
    this.dataCount++
    console.log(`Chunk #${this.dataCount}:`, chunk.toString())
    callback()
  }

  _final(callback) {
    console.log(`Всього оброблено ${this.dataCount} chunks`)
    callback()
  }
}

const myStream = new MyWritableStream()

myStream.write('Перший chunk\n')
myStream.write('Другий chunk\n')
myStream.end('Останній chunk\n')
