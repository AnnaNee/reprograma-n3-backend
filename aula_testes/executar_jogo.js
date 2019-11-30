const readline = require('readline')
const jogo = require('./jogo')
const numeroGerado = Math.floor(Math.random() * 100)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const perguntar = (readLine = rl) => {
  readLine.question('Adivinhe o número secreto: ', resposta => {
    const resultado = jogo(numeroGerado, resposta)

    if (resultado.acertou) {
      console.log('Parabéns! Você acertou.')
      return readLine.close()
    }

    console.log(resultado.mensagemErro)
    perguntar()
  })
}

perguntar()

module.exports = perguntar
