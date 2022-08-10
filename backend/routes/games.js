const express = require('express');
const { getCardById } = require('../functions/Cards');
const { getCharacterById } = require('../functions/Characters');
const { getEventById } = require('../functions/Events');
const { postGame, getGame, putGame, hidePlayersAttributes, handleRound } = require('../functions/Games');
const getRandomInt = require('../functions/getRandomInt');
const router = express.Router();
const getId = require('../functions/getId');
const { BadRequest } = require('../utils/errors');
const { getUserById } = require('../functions/Users');

router.post('/', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { eventId } = req.body;
    const user = await getUserById(userId);
    if (!user) throw new BadRequest('Invalid user');
    if (!user.selected) throw new BadRequest('No card selected');
    const { selected } = user;
    const event = await getEventById(eventId);
    if (!event.id) throw new BadRequest('Invalid event ID');
    const checkGameExists = await getGame({userId, eventId, completed: false})
    if (checkGameExists[0]) {
      gameResponse = checkGameExists[0];
    } else {
      const card = await getCardById(selected);
      if (!card.id || card.userId !== userId) throw new BadRequest('Invalid card');
      if (!event.characters.includes(card.charId)) throw new BadRequest('Selected Character is not valid for this event.')
      const enemy = await getCharacterById(event.enemies[0]);
      if (!enemy.id) throw new BadRequest('Could not load enemy.');
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
      const turn = getRandomInt(0,1);
      const dialog = []; 
      dialog.push({character: '', copy:`${players[0].name} vs ${players[1].name}`});
      dialog.push({character: '', copy:`${players[Number(turn)].name} goes first!`});
      let game = {
        id: getId(),
        userId,
        eventId,
        selectedId: selected,
        players,
        output: dialog,
        turn,
        started: true,
      }
      gameResponse = await postGame(game);
    }
    res.send({id: gameResponse.id});
  } catch(err) {
    next(err);
  }
});

router.get('/:gameId', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { gameId } = req.params;
    const g = await getGame({id: gameId, userId});
    if (!g[0]) throw new BadRequest('Invalid game ID');
    let { id, eventId, players, completed, attributes, started, turn, output } = g[0];
    if (completed) throw new BadRequest('Game has been completed');    
    players[1].stats = hidePlayersAttributes(players[1].stats, attributes);
    res.send({ id, userId, eventId, players, completed, attributes, started, turn, output }) 
  } catch(err) {
    next(err);
  }
});

router.put('/:gameId/attribute/:attribute', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { gameId, attribute } = req.params;
    const g = await getGame({ id: gameId , userId });
    const { id } = g[0];
    if (!g[0]) throw new BadRequest('Invalid game ID');
    if (g[0].turn) throw new BadRequest(`It's currently not your turn.`);
    if (g[0].completed) throw new BadRequest('Game has been completed');
    const roundResponse = handleRound(g[0], attribute);
    const { players, completed, attributes, turn, output } = roundResponse;
    const putGameResponse = await putGame({ id }, {
      players,
      completed,
      attributes,
      turn,
      output,
    })
    players[1].stats = hidePlayersAttributes(players[1].stats, attributes);
    const game = {
      id,
      players,
      completed,
      attributes,
      turn,
      output
    }
    res.send(game)
  } catch(err) {
    next(err);
  }
})

router.put('/:gameId/turn', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { gameId } = req.params;
    const g = await getGame({id: gameId , userId});
    if (!g[0]) throw new BadRequest('Invalid game ID');
    const { id } = g[0];
    if (!g[0].turn) throw new BadRequest('Not CPU turn');
    if (g[0].completed) throw new BadRequest('Game has been completed');
    const { stats } = g[0].players[1];
    let highest = {
      stat: 0,
      attribute: '',
    }
    for (const [key, value] of Object.entries(stats)) {
      if (value > highest.stat && !g[0].attributes.includes(key)) highest = {stat: value, attribute: key}
    }

    const roundResponse = handleRound(g[0], highest.attribute);
    const { players, completed, attributes, turn, output } = roundResponse;
    const putGameResponse = await putGame({ id }, {
      players,
      completed,
      attributes,
      turn,
      output,
    })
    players[1].stats = hidePlayersAttributes(players[1].stats, attributes);
    const game = {
      id,
      players,
      completed,
      attributes,
      turn,
      output
    }
    res.send(game)
  } catch(err) {
    next(err);
  }
});

module.exports = router;