queueMicrotask(() => {
  console.log('queueMicrotask')
})

setImmediate(() => {
  console.log('setImmediate')
})
