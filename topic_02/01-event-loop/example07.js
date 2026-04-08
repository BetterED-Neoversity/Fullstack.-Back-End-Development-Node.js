import { EventEmitter } from 'events'

class Database extends EventEmitter {
  connect(connectionString) {
    setTimeout(() => {
      this.emit('connected', connectionString)
    }, 1000)
  }

  query(sql) {
    this.emit('query', sql)

    setTimeout(() => {
      this.emit('result', { rows: [], count: 0 })
    }, 500)
  }

  disconnect() {
    this.emit('disconnected')
  }
}

const db = new Database()

db.once('connected', (connString) => {
  console.log(`Connected to ${connString}`)
  db.query('SELECT * FROM users')
})

db.on('query', (sql) => {
  console.log(`Query: ${sql}`)
})

db.on('result', (result) => {
  console.log(`Query Result: ${JSON.stringify(result)}`)
  db.disconnect()
})

db.on('disconnected', () => {
  console.log('Disconnected from database')
})

db.connect('localhost:5432')

db.connect('localhost:5432')

db.on('query', () => {})
db.on('query', () => {})
db.on('query', () => {})

console.log(db.listenerCount('query')) // 3
console.log(db.listenerCount('result')) // 0
