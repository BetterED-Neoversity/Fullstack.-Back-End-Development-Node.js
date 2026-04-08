import { watch } from 'fs'

const watcher = watch('./test.txt')

watcher.on('change', (eventType, filename) => {
  console.log(`File ${filename} was changed: ${eventType}`)
})

watcher.on('error', (err) => {
  console.error('Watcher error:', err.message)
})

// Зупинка моніторингу
setTimeout(() => {
  watcher.close()
  console.log('Stopped watching')
}, 10000)
