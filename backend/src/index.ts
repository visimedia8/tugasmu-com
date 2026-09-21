import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { toolParafrase } from './routes/parafrase'

import { toolGeneratorSoal } from './routes/generator-soal'
import { toolRangkuman } from './routes/rangkuman'
import { toolPantunPuisi } from './routes/pantun-puisi'

export type Bindings = {
  DB: D1Database
  DEEPSEEK_API_KEY: string
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

export default app
