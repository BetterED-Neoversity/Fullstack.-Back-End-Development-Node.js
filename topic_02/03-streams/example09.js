import stream from 'stream'

class ReplaceStream extends stream.Transform {
  constructor(searchString, replaceString) {
    super()
    this.searchString = searchString
    this.replaceString = replaceString
  }

  _transform(chunk, encoding, callback) {
    const text = chunk.toString()
    const replaced = text.split(this.searchString).join(this.replaceString)
    this.push(replaced)
    callback()
  }
}

const replacer = new ReplaceStream('World', 'Node.js')

replacer.on('data', (chunk) => {
  console.log(chunk.toString())
})

// replacer.write('Hello World')
// replacer.write(' and World')
// replacer.end('!')

replacer.write('Hello W')
replacer.end('orld!')
