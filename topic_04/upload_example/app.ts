import express, { Request, Response, NextFunction } from 'express'
import multer, { FileFilterCallback } from 'multer'
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

class InvalidFileTypeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidFileTypeError'
  }
}

const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new InvalidFileTypeError('Дозволені тільки зображення (JPEG, PNG, GIF)'))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log('Файл:', req.file)
  res.send(`Файл збережено як: ${req.file!.filename}`)
})

app.post(
  '/upload-multiple',
  upload.array('photos', 5),
  (req: Request, res: Response) => {
    console.log('Завантажено файлів:', req.files!.length)
    ;(req.files as Express.Multer.File[]).forEach((file) => {
      console.log('Файл:', file.filename)
    })
    res.send(
      `Завантажено ${(req.files as Express.Multer.File[]).length} файлів`,
    )
  },
)

app.post(
  '/upload-docs',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'documents', maxCount: 3 },
  ]),
  (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    console.log('Аватар:', files['avatar'])
    console.log('Документи:', files['documents'])

    const avatarCount = files['avatar'] ? files['avatar'].length : 0
    const docsCount = files['documents'] ? files['documents'].length : 0

    res.send(`Завантажено: ${avatarCount} аватар, ${docsCount} документів`)
  },
)

// Error middleware для обробки помилок multer
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('Файл занадто великий. Максимум 5MB')
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).send('Занадто багато файлів')
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).send('Неочікуване поле з файлом')
    }
    return res.status(400).send(`Помилка завантаження: ${err.message}`)
  }

  if (err instanceof InvalidFileTypeError) {
    return res.status(400).send(err.message)
  }

  next(err)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err)
  res.status(500).send('Внутрішня помилка сервера')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
