import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { toolParafrase } from './routes/parafrase'
import { toolGeneratorSoal } from './routes/generator-soal'
import { toolRangkuman } from './routes/rangkuman'
import { toolPantunPuisi } from './routes/pantun-puisi'
import { toolPidato } from './routes/pidato'
import { toolGrammarEyd } from './routes/grammar-eyd'
import { toolMathSolver } from './routes/math-solver'
import { toolLaporanPkl } from './routes/laporan-pkl'
import { toolGrammarChecker } from './routes/grammar-checker'
import { toolTranslatorArab } from './routes/translator-arab'
import { toolMakalahBuilder } from './routes/makalah-builder'
import { toolCvLamaran } from './routes/cv-lamaran'
import { toolSimulasiUtbk } from './routes/simulasi-utbk'
import { toolPenerjemahDaerah } from './routes/penerjemah-daerah'
import { toolKtiBuilder } from './routes/kti-builder'
import { toolSlideOutline } from './routes/slide-outline'
import { toolProposalUsaha } from './routes/proposal-usaha'
import { toolAkuntansiSolver } from './routes/akuntansi-solver'
import { toolPenjelasKejuruan } from './routes/penjelas-kejuruan'
import { toolCeritaPendek } from './routes/cerita-pendek'
import { toolKamusAnak } from './routes/kamus-anak'
import { toolEssayEnglish } from './routes/essay-english'
import { toolKitabKuning } from './routes/kitab-kuning'
import { toolNahwuShorof } from './routes/nahwu-shorof'
import { toolMuhafazhah } from './routes/muhafazhah'
import { toolTafsirQuran } from './routes/tafsir-quran'
import { toolPenjelasHadits } from './routes/penjelas-hadits'
import { toolMateriPai } from './routes/materi-pai'
import { toolTajwid } from './routes/tajwid'
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
app.route('/api/tools/pidato', toolPidato)
app.route('/api/tools/grammar-eyd', toolGrammarEyd)
app.route('/api/tools/math-solver', toolMathSolver)
app.route('/api/tools/laporan-pkl', toolLaporanPkl)
app.route('/api/tools/grammar-checker', toolGrammarChecker)
app.route('/api/tools/translator-arab', toolTranslatorArab)
app.route('/api/tools/makalah-builder', toolMakalahBuilder)
app.route('/api/tools/cv-lamaran', toolCvLamaran)
app.route('/api/tools/simulasi-utbk', toolSimulasiUtbk)
app.route('/api/tools/penerjemah-daerah', toolPenerjemahDaerah)
app.route('/api/tools/kti-builder', toolKtiBuilder)
app.route('/api/tools/slide-outline', toolSlideOutline)
app.route('/api/tools/proposal-usaha', toolProposalUsaha)
app.route('/api/tools/akuntansi-solver', toolAkuntansiSolver)
app.route('/api/tools/penjelas-kejuruan', toolPenjelasKejuruan)
app.route('/api/tools/cerita-pendek', toolCeritaPendek)
app.route('/api/tools/kamus-anak', toolKamusAnak)
app.route('/api/tools/essay-english', toolEssayEnglish)
app.route('/api/tools/kitab-kuning', toolKitabKuning)
app.route('/api/tools/nahwu-shorof', toolNahwuShorof)
app.route('/api/tools/muhafazhah', toolMuhafazhah)
app.route('/api/tools/tafsir-quran', toolTafsirQuran)
app.route('/api/tools/penjelas-hadits', toolPenjelasHadits)
app.route('/api/tools/materi-pai', toolMateriPai)
app.route('/api/tools/tajwid', toolTajwid)
app.route('/api/payment', payment)

// Class Routes
app.route('/api/classes', classes)
app.route('/api/assignments', assignments)

// User Routes
app.route('/api/user', user)

export default app
