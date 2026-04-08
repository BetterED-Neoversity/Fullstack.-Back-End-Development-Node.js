function processLargeArray(array, callback) {
  const batchSize = 100
  let index = 0

  function processBatch() {
    const endIndex = Math.min(index + batchSize, array.length)

    for (; index < endIndex; index++) {
      // Обробка елемента
      array[index] = array[index] * 2
    }

    if (index < array.length) {
      // Відкладаємо наступну партію
      setImmediate(processBatch)
    } else {
      callback()
    }
  }

  processBatch()
}

const data = new Array(10000).fill(1)

console.log('Processing started')

processLargeArray(data, () => {
  console.log('Processing completed')
  console.log('First 5 elements:', data.slice(0, 5))
})

console.log('Function returned')
