const express = require('express');
const { getCardById } = require('../functions/Cards');
const { getCharacterById } = require('../functions/Characters');
const { getEventById } = require('../functions/Events');
const { postGame, getGame } = require('../functions/Games');
const getRandomInt = require('../functions/getRandomInt');
const router = express.Router();
const getId = require('../functions/getId');
const { BadRequest } = require('../utils/errors');

router.post('/', async (req, res, next) => {
  try {
    const { userId, eventId, selected } = req.body;
    const event = await getEventById(eventId);
    if (!event.id) throw new BadRequest('Invalid event ID');
    const checkGameExists = await getGame({userId, eventId, completed: false})
    if (checkGameExists) {
      gameResponse = checkGameExists;
    } else {
      const card = await getCardById(selected);
      if (!card.id || card.userId !== userId) throw new BadRequest('Invalid card');
      if (!event.characters.includes(card.charId)) throw new BadRequest('Selected Character is not valid for this event.')
      const enemy = await getCharacterById(event.enemies[0]);
      if (!enemy.id) throw new BadRequest('Could not load enemy.');
      const dialog = [];
      event.dialog.forEach(d => {
        let { character, copy } = d;
        if (character === '<player1>') character = card.charId;
        if (character === '<player2>') character = enemy.id;
        dialog.push({ character: Number(character), copy })
      });
      const players = [
        {
          id: card.charId,
          name: card.name,
          colour: card.colour,
          stats: card.stats,
          hp: 100,
        },
        {
          id: enemy.id,
          name: enemy.name,
          colour: enemy.colour,
          stats: enemy.stats,
          hp: 100,
        }
      ]
      let game = {
        id: getId(),
        userId,
        eventId,
        selectedId: selected,
        players,
        output: dialog,
        turn: getRandomInt(0,1),
      }
      gameResponse = await postGame(game);
      console.log(gameResponse)
    }
    res.send(gameResponse);
  } catch(err) {
    next(err);
  }
});

module.exports = router;