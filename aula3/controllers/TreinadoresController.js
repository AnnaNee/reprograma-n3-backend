const { connect } = require('../models/Repository')
const treinadoresModel = require('../models/TreinadoresSchema')
const { pokemonsModel } = require('../models/PokemonsSchema')

connect()

const calcularNivel = (inicio, fim, nivelAtual) => {
  const diff = Math.abs(new Date(inicio) - new Date(fim)) / 3600000

  return (diff / 4) + nivelAtual;
}

const montarPokemonUpdateBody = async (body) => {
  let setBody = {}

  if (body.nome) {
    setBody['pokemons.$.nome'] = body.nome
  }

  if (body.foto) {
    setBody['pokemons.$.foto'] = body.foto
  }

  return (
    {
      $set: setBody
    }
  )
}

const getAll = (request, response) => {
  treinadoresModel.find((error, treinadores) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(treinadores)
  })
}

const getById = (request, response) => {
  const id = request.params.id

  return treinadoresModel.findById(id, (error, treinador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (treinador) {
      return response.status(200).send(treinador)
    }

    return response.status(404).send('Treinador não encontrado.')
  })
}

const add = (request, response) => {
  const novoTreinador = new treinadoresModel(request.body)

  novoTreinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(novoTreinador)
  })
}

const remove = (request, response) => {
  const id = request.params.id

  treinadoresModel.findByIdAndDelete(id, (error, treinador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (treinador) {
      return response.status(200).send(id)
    }

    return response.status(404).send('Treinador não encontrado.')
  })
}

const update = (request, response) => {
  const id = request.params.id
  const treinadorUpdate = request.body
  const options = { new: true }

  treinadoresModel.findByIdAndUpdate(
    id,
    treinadorUpdate,
    options,
    (error, treinador) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (treinador) {
        return response.status(200).send(treinador)
      }

      return response.status(404).send('Treinador não encontrado.')
    }
  )
}

const addPokemon = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemon = request.body
  const options = { new: true }
  const novoPokemon = new pokemonsModel(pokemon)
  const treinador = await treinadoresModel.findById(treinadorId)

  treinador.pokemons.push(novoPokemon)
  treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(treinador)
  })
}

const treinarPokemon = async (request, response) => {
  const pokemonId = request.params.pokemonId
  const treinadorId = request.params.treinadorId
  const treinador = await treinadoresModel.findById(treinadorId)
  const pokemon = treinador.pokemons.find(pokemon => pokemon._id == pokemonId)

  pokemon.nivel = calcularNivel(request.body.inicio, request.body.fim, pokemon.nivel)

  return treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(treinador)
  })
}

const getPokemons = async (request, response) => {
  const treinadorId = request.params.id
  await treinadoresModel.findById(treinadorId, (error, treinador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (treinador) {
      return response.status(200).send(treinador.pokemons)
    }

    return response.status(404).send('Treinador não encontrado.')
  })
}

const updatePokemon = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemonId = request.params.pokemonId
  const options = { new: true }
  const updateBody = await montarPokemonUpdateBody(request.body)

  treinadoresModel.findOneAndUpdate(
    { _id: treinadorId, 'pokemons._id': pokemonId },
    updateBody,
    options,
    (error, treinador) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (treinador) {
        return response.status(200).send(treinador)
      }

      return response.status(404).send('Treinador não encontrado.')
    }
  )
}

const getPokemonById = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemonId = request.params.pokemonId
  const treinador = await treinadoresModel.findById(treinadorId)
  const pokemon = treinador.pokemons.find(pokemon => pokemon._id == pokemonId)

  return response.status(200).send(pokemon)
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  addPokemon,
  treinarPokemon,
  getPokemons,
  updatePokemon,
  getPokemonById
}
