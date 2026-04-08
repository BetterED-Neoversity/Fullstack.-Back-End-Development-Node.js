import { EventEmitter } from 'events'

const emitter = new EventEmitter()

emitter.on('data', () => {
  throw new Error('Handler crashed')
})

emitter.on('error', (err) => {
  console.log('This will NOT catch the handler error')
})

emitter.emit('data') // Процес впаде з необробленим винятком
