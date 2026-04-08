import stream from 'stream'
import fs from 'fs'

class JSONLinesWriter extends stream.Writable {
  constructor(filepath, options) {
    super({ ...options, objectMode: true })
    this.fileStream = fs.createWriteStream(filepath)
  }

  _write(obj, encoding, callback) {
    const line = JSON.stringify(obj) + '\n'
    this.fileStream.write(line, callback)
  }

  _final(callback) {
    this.fileStream.end(callback)
  }
}

const writer = new JSONLinesWriter('users.jsonl')

writer.write({ id: 1, name: 'Mike Smith', age: 25 })
writer.write({ id: 2, name: 'Jane Doe', age: 30 })
writer.write({ id: 3, name: 'John Johnson', age: 35 })
writer.end()
