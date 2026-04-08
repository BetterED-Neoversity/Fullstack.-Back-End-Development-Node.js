import express, { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

// Детальна конфігурація зберігання
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    )
  },
})

// Налаштування multer
const upload = multer({ storage: storage })

app.post('/upload', upload.single('avatar'), (req: Request, res: Response) => {
  console.log('Файл:', req.file)
  res.send(`Файл збережено як: ${req.file!.filename}`)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
