let timerCount = 0
let batchCount = 0

// Таймер з мінімальним інтервалом
const timer = setInterval(() => {
  timerCount++
  console.log(`[Timer ${timerCount}]`)
}, 1)

async function processBatches() {
  for (let i = 0; i < 10; i++) {
    batchCount++
    console.log(`\n--- Batch ${batchCount} ---`)

    // process.nextTick() - ще один спосіб віддати контроль
    await new Promise((resolve) => process.nextTick(resolve))
  }
}

processBatches().then(() => {
  clearInterval(timer)
  console.log(
    `\nDone! Timer fired ${timerCount} times during ${batchCount} batches`,
  )
})
