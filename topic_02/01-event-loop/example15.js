let counter = 0

const recursiveNextTick = () => {
  counter++
  console.log('Tick:', counter)

  if (counter < 1000000) {
    process.nextTick(recursiveNextTick)
  }
}

setTimeout(() => {
  console.log('Timer') // Ніколи не виконається до завершення nextTick
}, 0)

process.nextTick(recursiveNextTick)
