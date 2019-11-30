const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const pokemons = require('./routes/pokemons')
const treinadores = require('./routes/treinadores')
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/pokemons', pokemons)
app.use('/treinadores', treinadores)

app.get('/', (request, response) => {
  response.send('Olá, mundo!')
})


app.listen(PORT)
console.info(`Rodando na porta ${PORT}`)
