const { connect } = require('../models/Repository')
const treinadoresModel = require('../models/TreinadoresSchema')
const { pokemonsModel } = require('../models/PokemonsSchema')
<<<<<<< HEAD
const bcrypt = require('bcryptjs')
=======
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b

connect()

const calcularNivel = (inicio, fim, nivelAtual) => {
  const diff = Math.abs(new Date(inicio) - new Date(fim)) / 3600000

  return (diff / 4) + nivelAtual;
}

<<<<<<< HEAD
const getAll = (request, response) => { 
=======
const getAll = (request, response) => {
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
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
<<<<<<< HEAD
  if (!request.body.senha){
    return response.status(400).send('Coloque uma senha!')
  }
  const senhaCriptografada = bcrypt.hashSync(request.body.senha)
  request.body.senha = senhaCriptografada
  
  const novoTreinador = new treinadoresModel(request.body)

  novoTreinador.save((error) => {
    if (error) { 
=======
  const novoTreinador = new treinadoresModel(request.body)

  novoTreinador.save((error) => {
    if (error) {
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
      return response.status(500).send(error)
    }

    return response.status(201).send(novoTreinador)
  })
}

<<<<<<< HEAD
const login = async (request, response) => {
  const email = request.body.email
  const senha = request.body.senha
  const treinador = await treinadoresModel.findOne({email})

  if (!treinador){
    return response.status(401).send('E-mail inválido.')
  }

  const senhaValida =  bcrypt.compareSync(senha, treinador.senha)

   if(senhaValida){
    return response.status(200).send('Usuário logado.')
  }
    return response.status(401).send('Senha inválida.')
}

=======
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
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
<<<<<<< HEAD
  const treinador = request.body

  treinadoresModel.findByIdAndUpdate(
    id,
    treinador,
=======
  const treinadorUpdate = request.body
  const options = { new: true }

  treinadoresModel.findByIdAndUpdate(
    id,
    treinadorUpdate,
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
    options,
    (error, treinador) => {
      if (error) {
        return response.status(500).sned(error)
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
  const novoPokemon = new pokemonsModel(pokemon)
  const treinador = await treinadoresModel.findById(treinadorId)
<<<<<<< HEAD

=======
  console.log(treinador, 'TAKI')
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
  treinador.pokemons.push(novoPokemon)
  treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(treinador)
  })
}

const treinarPokemon = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemonId = request.params.pokemonId
  const inicio = request.body.inicio
  const fim = request.body.fim
  const treinador = await treinadoresModel.findById(treinadorId)
  const pokemon = treinador.pokemons.find((pokemon) => pokemonId == pokemon._id)
  const novoNivel = calcularNivel(inicio, fim, pokemon.nivel)

  pokemon.nivel = novoNivel
  treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(treinador)
  })
}

<<<<<<< HEAD
const getPokemonByTreinador = async (request, response) => {
    const treinadorId = request.params.treinadorId
    const pokemonId = request.params.pokemonId 

    const treinador = await treinadoresModel.findById(treinadorId)
    
    treinador.pokemons.find((error, pokemon) =>  {
    
      if (pokemonId == pokemon._id) {
        return response.status(200).send(pokemons)
      }
  
      return response.status(500).send(error)
    })
}

const getPokemons = async (request, response) => {
  const treinadorId = request.params.id

  const treinador = await treinadoresModel.findById(treinadorId)

  if (treinador){
    return response.status(200).send(treinador.pokemons)
  }
    return response.status(404).send('Treinador não encontrado.')
}  

const updatePokemon = (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemonId = request.params.pokemonId
  const pokemon = request.body

  treinadoresModel.findOneAndUpdate(
    { _id: treinadorId, 'pokemons.$._id': pokemonId },
    { $set:
        {
          'pokemons.$.nome': pokemon.nome,
          'pokemons.$.foto': pokemon.foto
        }
    },
    { new: true },
    (error, treinador) => {
      if (error) {
        return response.status(500).send(error)
      }

      return response.status(200).send(treinador)
    }
  )
=======
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  addPokemon,
<<<<<<< HEAD
  treinarPokemon,
  getPokemonByTreinador,
  getPokemons,
  login
=======
  treinarPokemon
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
}
