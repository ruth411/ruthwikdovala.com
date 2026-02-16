import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { chatRouter } from './routes/chat'

const app = express()
const port = Number(process.env.PORT || 8787)

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,https://ruthwikdovala.com')
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean)

app.disable('x-powered-by')
app.use(express.json({ limit: '1mb' }))

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('CORS origin blocked'))
    },
  }),
)

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

app.get('/healthz', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/project-assistant', chatRouter)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err.message.includes('CORS')) {
    return res.status(403).json({ error: 'Forbidden origin' })
  }
  return res.status(500).json({ error: 'Server error' })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Project assistant API running on :${port}`)
})
