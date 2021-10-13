const app = require('./server-config')
const { performance } = require('perf_hooks')

const PORT = process.env.PORT ?? 3333

const history = []

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`)
})

app.post('/api/calculate', (req, res) => {
  const num = Number(req.body.numero)

  if (isNaN(num) || num < 101) return res.status(400).json({ message: 'Precisa ser um número real maior que 100!' }) 

  const before = performance.now()

  let i = 2
  while (true) {
    const resultado = String(num * i)

    const found = []

    for (const item of resultado) {
      if (found[0] !== item && found[1] !== item && item !== '.' && item !== '-') {
        found.push(item)

        if (found.length > 2) break
      }
    }

    if (found.length === 2) {
      const now = performance.now()

      const result = `${num} x ${i} = ${resultado}, o resultado demorou ${now - before}ms para ser encontrado.`

      if (history.length === 9) history.pop()

      history.push(result)

      return res.json({ result })
      break
    }

    i++
  }
})

app.get('/api/calculate/history', (req, res) => {
  res.json({ result: history })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found.' })
})