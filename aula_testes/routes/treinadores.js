const express = require('express');
const router = express.Router();

const controller = require("../controllers/TreinadoresController")

router.get('', controller.getAll)
router.post('', controller.add)
router.get('/:id', controller.getById)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
router.post('/:treinadorId/pokemons', controller.addPokemon)
router.patch('/:treinadorId/pokemons/:pokemonId/treinar', controller.treinarPokemon)
router.get('/:treinadorId/pokemons/:pokemonId', controller.getPokemonById)
router.patch('/:treinadorId/pokemons/:pokemonId', controller.updatePokemon)
router.post('/login', controller.login)

module.exports = router
