console.log('1: Start')

queueMicrotask(() => {
  console.log('2: queueMicrotask')
})

Promise.resolve().then(() => {
  console.log('3: Promise')
})

process.nextTick(() => {
  console.log('4: nextTick')
})

console.log('5: End')
