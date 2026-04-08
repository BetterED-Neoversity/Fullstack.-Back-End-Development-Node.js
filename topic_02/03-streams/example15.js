import fs from 'fs'
import ReplaceStream from './ReplaceStream.js'

process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout)
