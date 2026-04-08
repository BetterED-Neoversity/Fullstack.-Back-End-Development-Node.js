// Функція затримки для уникнення блокування event loop
function delay() {
  return new Promise((resolve) => setImmediate(resolve))
}

async function processLargeArray(array) {
  const batchSize = 100
  let index = 0
  let batchCount = 0

  while (index < array.length) {
    const endIndex = Math.min(index + batchSize, array.length)

    for (; index < endIndex; index++) {
      // Обробка елемента
      array[index] = array[index] * 2
    }

    batchCount++
    // Якщо є ще елементи, відкладаємо наступну партію
    if (index < array.length) {
      await delay()
    }
  }
}

const data = new Array(10000).fill(1)

console.log('Processing started')
console.log('---')

// Створимо таймер, який показує, що Event Loop вільний
let timerCount = 0
const timer = setInterval(() => {
  timerCount++
  console.log(`[Event Loop is free] Timer tick ${timerCount}`)
}, 1)

async function main() {
  await processLargeArray(data)
  console.log('---')
  console.log('Processing completed')
  console.log('First 5 elements:', data.slice(0, 5))
  console.log('Timer was called', timerCount, 'times while processing')

  clearInterval(timer)
  console.log('Function returned')
}

await main()
