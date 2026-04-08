import { readFile } from 'fs/promises'

console.log('Start')

setTimeout(() => {
  console.log('Timer 1')
}, 0)

readFile('./file.txt').then(() => {
  console.log('File read')

  setTimeout(() => {
    console.log('Timer 2')
  }, 0)
})

console.log('End')
