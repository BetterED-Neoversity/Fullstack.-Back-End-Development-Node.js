import { EventEmitter } from 'events'

class Resource extends EventEmitter {
  constructor() {
    super()
    // Погана практика - подія публікується до реєстрації обробників
    this.emit('ready')
  }
}

const resource = new Resource()

resource.on('ready', () => {
  console.log('Resource is ready') // Ніколи не виконається!
})
