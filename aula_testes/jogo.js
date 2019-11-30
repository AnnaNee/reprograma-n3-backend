const jogo = (numeroGerado, resposta) => {
  const numeroFormatado = parseInt(resposta)
  if (Number.isNaN(numeroFormatado)) {
    return { mensagemErro: 'Não é um número válido' }
  }

  const numeroAdivinhado = parseInt(resposta)

  if (numeroAdivinhado == numeroGerado) {
    return { acertou: true }
  }

  if (numeroAdivinhado > numeroGerado) {
    return { mensagemErro: 'Tente um número menor!' }
  }

  return { mensagemErro: 'Tente um número maior!' }
}

module.exports = jogo
