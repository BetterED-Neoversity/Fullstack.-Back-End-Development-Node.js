import { EventEmitter } from 'events'

const emitter = new EventEmitter()

// Публікуємо помилку без обробника
emitter.emit('error', new Error('Something went wrong'))
