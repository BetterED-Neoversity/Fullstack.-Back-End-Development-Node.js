import { EventEmitter } from 'events'
import { watch } from 'fs'
import { readFile, stat } from 'fs/promises'

class FileMonitor extends EventEmitter {
  constructor(filepath) {
    super()
    this.filepath = filepath
    this.watcher = null
    this.isProcessing = false

    // Гарантуємо асинхронність події 'initialized'
    process.nextTick(() => {
      this.emit('initialized', this.filepath)
    })
  }

  async start() {
    try {
      // Перевіряємо чи файл існує
      await stat(this.filepath)

      this.watcher = watch(this.filepath, async (eventType) => {
        if (this.isProcessing) {
          return // Ігноруємо події під час обробки
        }

        this.isProcessing = true
        this.emit('change-detected', eventType)

        // Використовуємо setImmediate для відкладення читання
        setImmediate(async () => {
          try {
            const content = await readFile(this.filepath, 'utf-8')
            const stats = await stat(this.filepath)

            this.emit('content-updated', {
              content,
              size: stats.size,
              modified: stats.mtime,
            })
          } catch (err) {
            this.emit('error', err)
          } finally {
            this.isProcessing = false
          }
        })
      })

      this.emit('started', this.filepath)
    } catch (err) {
      this.emit('error', err)
    }
  }

  stop() {
    if (this.watcher) {
      this.watcher.close()
      this.watcher = null
      this.emit('stopped')
    }
  }
}

// Використання
const monitor = new FileMonitor('./test.txt')

monitor.on('initialized', (path) => {
  console.log(`Monitor initialized for: ${path}`)
  monitor.start()
})

monitor.on('started', (path) => {
  console.log(`Monitoring started: ${path}`)
})

monitor.on('change-detected', (eventType) => {
  console.log(`Change detected: ${eventType}`)
})

monitor.on('content-updated', (data) => {
  console.log('File updated:')
  console.log(`  Size: ${data.size} bytes`)
  console.log(`  Modified: ${data.modified.toISOString()}`)
  console.log(`  Content preview: ${data.content.substring(0, 50)}...`)
})

monitor.on('error', (err) => {
  console.error('Monitor error:', err.message)
})

monitor.on('stopped', () => {
  console.log('Monitoring stopped')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, stopping...')
  monitor.stop()
})
