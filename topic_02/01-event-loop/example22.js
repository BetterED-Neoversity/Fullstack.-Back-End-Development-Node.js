queueMicrotask(() => {
  console.log('Microtask 1')
  queueMicrotask(() => {
    console.log('Nested microtask')
  })
})

Promise.resolve().then(() => {
  console.log('Promise 1')
})

queueMicrotask(() => {
  console.log('Microtask 2')
})
