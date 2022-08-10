const { game } = require('../models/Game.model.js');
const { BadRequest } = require('../utils/errors');

const getGame = async (query) => await game.find(query);

const postGame = async (g) => await game.create(g);

const putGame = async (id, g) => await game.updateOne(id, g);

const hidePlayersAttributes = (stats, attributes) => {
  const statsDisplay = {}
    for (const [key, value] of Object.entries(stats)) {
      if (!attributes.includes(key)) { 
        statsDisplay[key] = '?' 
      } else {
        statsDisplay[key] = value;
      }
    }
    return statsDisplay;
}

module.exports = { postGame, getGame, putGame, hidePlayersAttributes };