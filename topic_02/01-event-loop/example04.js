import { EventEmitter } from 'events'

const emitter = new EventEmitter()

// Підписуємось на подію
emitter.on('greeting', (name) => {
  console.log(`Hello, ${name}!`)
})

// Публікуємо подію
emitter.emit('greeting', 'World')
