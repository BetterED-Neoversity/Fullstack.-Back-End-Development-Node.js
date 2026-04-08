import { EventEmitter } from 'events'

const emitter = new EventEmitter()

emitter.on('test', () => {
  console.log('2: Event handler')
})

console.log('1: Before emit')
emitter.emit('test')
console.log('3: After emit')
