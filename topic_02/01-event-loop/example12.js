console.log('1: Start')

process.nextTick(() => {
  console.log('2: nextTick')
})

Promise.resolve().then(() => {
  console.log('3: Promise')
})

setTimeout(() => {
  console.log('4: setTimeout')
}, 0)

console.log('5: End')
