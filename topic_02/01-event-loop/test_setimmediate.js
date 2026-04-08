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

    // setImmediate віддає контроль Event Loop
    await new Promise((resolve) => setImmediate(resolve))
  }
}

processBatches().then(() => {
  clearInterval(timer)
  console.log(
    `\nDone! Timer fired ${timerCount} times during ${batchCount} batches`,
  )
})
