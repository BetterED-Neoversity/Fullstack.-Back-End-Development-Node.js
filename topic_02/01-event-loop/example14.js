import { EventEmitter } from 'events'

class Resource extends EventEmitter {
  constructor() {
    super()
    // Відкладаємо публікацію події на кінець поточного циклу
    process.nextTick(() => {
      this.emit('ready')
    })
  }
}

const resource = new Resource()

resource.on('ready', () => {
  console.log('Resource is ready')
})
