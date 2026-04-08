import { EventEmitter } from 'events'

class Database extends EventEmitter {
  connect(connectionString) {
    setTimeout(() => {
      if (!connectionString) {
        this.emit('error', new Error('Connection string is required'))
        return
      }
      this.emit('connected', connectionString)
    }, 1000)
  }

  query(sql) {
    if (!sql) {
      this.emit('error', new Error('SQL query is required'))
      return
    }

    this.emit('query', sql)
    setTimeout(() => {
      this.emit('result', { rows: [] })
    }, 500)
  }
}

const db = new Database()

// Обов'язково реєструємо обробник помилок
db.once('error', (err) => {
  console.error('Database error:', err.message)
  // Тут можна логувати помилку, повідомити моніторинг, тощо
})

db.on('connected', (connString) => {
  console.log(`Connected to ${connString}`)
})

db.connect('') // Викличе 'error' замість краху процесу
