import { EventEmitter } from 'events'

const emitter = new EventEmitter()

emitter.on('data', (value) => {
  console.log('Handler 1:', value)
})

emitter.on('data', (value) => {
  console.log('Handler 2:', value)
})

emitter.emit('data', 42)
