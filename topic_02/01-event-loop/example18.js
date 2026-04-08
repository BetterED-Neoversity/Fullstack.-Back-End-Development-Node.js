let counter = 0

const recursiveImmediate = () => {
  counter++
  console.log('Immediate:', counter)

  if (counter < 5) {
    setImmediate(recursiveImmediate)
  }
}

setTimeout(() => {
  console.log('Timer executed between immediates')
}, 0)

setImmediate(recursiveImmediate)
