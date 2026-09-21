import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { toolParafrase } from './routes/parafrase'

import { toolGeneratorSoal } from './routes/generator-soal'
import { toolRangkuman } from './routes/rangkuman'
import { toolPantunPuisi } from './routes/pantun-puisi'
import { payment } from './routes/payment'
import { classes } from './routes/classes'
import { assignments } from './routes/assignments'
import { user } from './routes/user'

export type Bindings = {
  DB: D1Database
  DEEPSEEK_API_KEY: string
  DUITKU_MERCHANT_CODE: string
  DUITKU_MERCHANT_KEY: string
  DUITKU_IS_PRODUCTION: string
  NEXTAUTH_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}))

app.get('/', (c) => {
  return c.text('TugasMu API is running!')
})

// Tool Routes
app.route('/api/tools/parafrase', toolParafrase)
app.route('/api/tools/generator-soal', toolGeneratorSoal)
app.route('/api/tools/rangkuman', toolRangkuman)
app.route('/api/tools/pantun-puisi', toolPantunPuisi)

// Payment Routes
app.route('/api/payment', payment)

// Class Routes
app.route('/api/classes', classes)
app.route('/api/assignments', assignments)

// User Routes
app.route('/api/user', user)

export default app
