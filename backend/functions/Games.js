const { game } = require('../models/Game.model.js');
const { BadRequest } = require('../utils/errors');

const getGame = async (query) => {
  const gameResponse = await game.find(query);
  return gameResponse[0];
};

const postGame = async (g) => await game.create(g);

module.exports = { postGame, getGame };