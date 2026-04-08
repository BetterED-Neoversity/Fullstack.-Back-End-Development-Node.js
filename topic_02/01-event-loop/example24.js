import { watch } from 'fs'

const watcher = watch('./test.txt', (eventType, filename) => {
  console.log(`Event: ${eventType}`)
  console.log(`File: ${filename}`)
})

console.log('Watching for file changes...')
