const { game } = require('../models/Game.model.js');
const { BadRequest } = require('../utils/errors');

const getGame = async (query) => await game.find(query);

const postGame = async (g) => await game.create(g);

const putGame = async (id, g) => await game.updateOne(id, g);

const hidePlayersAttributes = (stats, attributes) => {
  const statsDisplay = {}
    for (const [key, value] of Object.entries(stats)) {
      if (!attributes.includes(key)) { 
        statsDisplay[key] = '??' 
      } else {
        statsDisplay[key] = value;
      }
    }
    return statsDisplay;
}

const handleRound = (game, attribute) => {
  const attributesFull = {
    dur: 'Durability',
    ene: 'Energy',
    spe: 'Speed',
    str: 'Strength',
    int: 'Intelligence',
    fig: 'Fighting',
  }
  const { players, turn, attributes } = game;
  let completed = false;
  if (attributes.includes(attribute)) throw new BadRequest('Attribute already selected');
  const dialog = [];
  dialog.push({
    character: '',
    copy: `${players[Number(turn)].name} plays the ${attributesFull[attribute]} attribute..`
  })
  const score = players[0].stats[attribute] - players[1].stats[attribute];
  let coins = 0;
  if (score > 0) {
    players[1].hp -= score;
    dialog.push({
      character: '',
      copy: `${players[0].name} beats ${players[1].name} by ${score} points!`,
    })
    if (players[1].hp <= 0) {
      players[1].hp = 0;
      dialog.push({
        character: '',
        copy: `${players[0].name} defeats ${players[1].name}!!`
      })
      completed = true;
      coins = 3;
    }
  } else if (score < 0) {
    players[0].hp += score;
    dialog.push({
      character: '',
      copy: `${players[1].name} beats ${players[0].name} by ${score *-1} points!`,
    })
    if (players[0].hp <= 0) {
      players[0].hp = 0;
      dialog.push({
        character: '',
        copy: `${players[1].name} defeats ${players[0].name}!!`
      })
      completed = true;
      coins = 1;
    }
  } else {
    dialog.push({
      character: '',
      copy: `It's a tie!`,
    })
  }
  attributes.push(attribute);
  if (attributes.length === 6 && !completed) {
    dialog.push({
      character: '',
      copy: `The game finishes in a tie!`
    })
    coins = 2
    completed = true;
  }
  return {
    players,
    completed,
    attributes,
    turn: !turn,
    output: dialog,
    coins,
  }
}

module.exports = { postGame, getGame, putGame, hidePlayersAttributes, handleRound };