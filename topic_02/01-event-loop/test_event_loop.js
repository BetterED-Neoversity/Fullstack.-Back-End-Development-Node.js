console.log('Start')

let count = 0
setInterval(() => {
  count++
  console.log('Event loop tick:', count)
}, 1)

// Це займає ~10мс, таймер (1мс) встигне спрацювати
setTimeout(() => {
  console.log('After setTimeout')
}, 10)

console.log('End')
