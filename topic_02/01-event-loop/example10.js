import { EventEmitter } from 'events'

class Database extends EventEmitter {
  constructor() {
    super()
    this.retryCount = 0
    this.maxRetries = 3
  }

  connect(connectionString) {
    setTimeout(() => {
      // Імітуємо випадкову помилку
      if (Math.random() < 0.5) {
        this.emit('error', new Error('Connection failed'))
        return
      }
      this.retryCount = 0
      this.emit('connected', connectionString)
    }, 1000)
  }
}

const db = new Database()

const connectionString = 'localhost:5432'

db.on('error', (err) => {
  console.error('Error:', err.message)

  if (db.retryCount < db.maxRetries) {
    db.retryCount++
    console.log(`Retrying... (${db.retryCount}/${db.maxRetries})`)
    setTimeout(() => db.connect(connectionString), 2000)
  } else {
    console.error('Max retries reached. Giving up.')
  }
})

db.on('connected', (connString) => {
  console.log(`Successfully connected to ${connString}`)
})

db.connect(connectionString)
