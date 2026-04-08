import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly isOperational = true,
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    time: new Date().toISOString(),
  })

  const status = err instanceof AppError ? err.status : 500

  res.status(status).json({
    error: {
      message:
        err instanceof AppError && err.isOperational
          ? err.message
          : 'Internal server error',
      status,
    },
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
