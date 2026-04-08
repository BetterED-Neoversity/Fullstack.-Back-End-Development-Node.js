// Функція затримки для імітації складної обробки
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 10))
}

async function processLargeArray(array) {
  const batchSize = 10 // Менші партії
  let index = 0
  let batchCount = 0

  while (index < array.length) {
    const endIndex = Math.min(index + batchSize, array.length)

    for (; index < endIndex; index++) {
      // Обробка елемента
      array[index] = array[index] * 2
    }

    batchCount++
    console.log(`Processed batch ${batchCount} (elements 0-${index})`)

    // Якщо є ще елементи, відкладаємо наступну партію
    if (index < array.length) {
      await delay()
    }
  }
}

const data = new Array(100).fill(1) // Менший масив

console.log('Async/await version - Processing started')
console.log('---')

// Створимо таймер, який показує, що Event Loop вільний
let timerCount = 0
const timer = setInterval(() => {
  timerCount++
  console.log(`[Event Loop is free] Timer tick ${timerCount}`)
}, 15)

async function main() {
  await processLargeArray(data)
  console.log('---')
  console.log('Processing completed')
  console.log('First 5 elements:', data.slice(0, 5))
  console.log('Timer was called', timerCount, 'times while processing')

  clearInterval(timer)
  console.log('Function returned')
}

main()
