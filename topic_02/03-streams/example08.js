import fs from 'fs'

const file = fs.createWriteStream('large.txt')

function writeMillionLines(writer, data, encoding, callback) {
  let i = 1000000
  write()

  function write() {
    let canContinue = true

    do {
      i--
      if (i === 0) {
        writer.write(data, encoding, callback)
      } else {
        canContinue = writer.write(data, encoding)
      }
    } while (i > 0 && canContinue)

    if (i > 0) {
      console.log('Буфер заповнився, очікуємо drain. Залишилось рядків:', i)
      writer.once('drain', write)
    }
  }
}

writeMillionLines(file, 'тест\n', 'utf-8', () => {
  console.log('Запис завершено')
})
