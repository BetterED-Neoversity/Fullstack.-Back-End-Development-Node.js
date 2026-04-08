import stream from 'stream'

class MyWritableStream extends stream.Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, callback) {
    // тут логіка обробки chunk
    console.log('Отримано chunk:', chunk.toString())
    callback()
  }
}

const myStream = new MyWritableStream()

myStream.write('Перший chunk\n')
myStream.write('Другий chunk\n')
myStream.end('Останній chunk\n')
