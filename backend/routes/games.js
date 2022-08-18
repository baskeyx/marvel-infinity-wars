const express = require('express');
const { getCardById, deleteCardById } = require('../functions/Cards');
const { getCharacterById, getRandomCharacter } = require('../functions/Characters');
const { getEventById } = require('../functions/Events');
const { postGame, getGame, putGame, hidePlayersAttributes, handleRound } = require('../functions/Games');
const getRandomInt = require('../functions/getRandomInt');
const router = express.Router();
const getId = require('../functions/getId');
const { BadRequest } = require('../utils/errors');
const { getUserById, putUserById } = require('../functions/Users');
const { getDialogById } = require('../functions/Dialogs');

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
      if (event.characters[0] !== '*') {
        if (!event.characters.includes(card.charId)) throw new BadRequest('Selected Character is not valid for this event.')
      }
      let enemy = {};
      if (event.enemies[0] === '*') {
        enemy = await getRandomCharacter({});
      } else {
        enemy = await getCharacterById(event.enemies[0]);
      }
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
    const user = await getUserById(userId);
    if (!user) throw new BadRequest('Invalid user');
    const { gameId } = req.params;
    const g = await getGame({id: gameId, userId});
    if (!g[0]) throw new BadRequest('Invalid game ID');
    let { id, eventId, players, completed, attributes, started, turn, output } = g[0];
    players[1].stats = hidePlayersAttributes(players[1].stats, attributes);
    res.send({ id, userId, eventId, players, completed, attributes, started, turn, output }) 
  } catch(err) {
    next(err);
  }
});

router.get('/:gameId/summary', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const user = await getUserById(userId);
    if (!user) throw new BadRequest('Invalid user');
    const { gameId } = req.params;
    const g = await getGame({id: gameId, userId, completed: true});
    if (!g[0]) throw new BadRequest('Invalid game summary');
    let { id, players, eventId, completed, attributes, started, turn, output } = g[0];
    const e = await getEventById(eventId);
    if (!e.id) throw new BadRequest('Invalid event ID');
    if (!g[0].completed) throw new BadRequest('Game has not been completed');
    const info = {};
    let score = g[0].players[0].hp - g[0].players[1].hp;
    const dialog = [];
    let dialogId = '';
    if (score > 0) {
      dialogId = '0f90e85f-fcc7-4779-b17b-6281fd761ea7';
    } else if (score < 0) {
      dialogId = 'd464e93e-77a6-479f-9583-0a05f50391b5';
    } 
    if (g[0].players[0].hp > 0 && g[0].players[1].hp > 0){
      dialogId = '1af3a3a0-8d6d-4912-9e54-23a91bd57553';
    }
    const dialogResponse = await getDialogById(dialogId);
    dialogResponse.dialog.forEach((d) => {
      const { copy } = d;
      dialog.push({
        character: g[0].players[0].id,
        copy,
      });
    })
    if (eventId === '6527') {
      const introDialogResponse = await getDialogById('cc894df9-f6cd-4a2a-9e43-c305fe00b7d5');
      dialog.push(...introDialogResponse.dialog)
    }
    res.send({ dialog, eventId });
  } catch(err) {
    next(err);
  }
});

router.put('/:gameId/attribute/:attribute', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const user = await getUserById(userId);
    if (!user) throw new BadRequest('Invalid user');
    const { gameId, attribute } = req.params;
    const g = await getGame({ id: gameId , userId });
    const { id } = g[0];
    if (!g[0]) throw new BadRequest('Invalid game ID');
    if (g[0].turn) throw new BadRequest(`It's currently not your turn.`);
    if (g[0].completed) throw new BadRequest('Game has been completed');
    const roundResponse = handleRound(g[0], attribute);
    const { players, completed, attributes, turn, output, coins } = roundResponse;
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
    if (completed) {
      const userQuery = { coins: coins + user.coins };
      if (user.intro) {
        userQuery.intro = false;
        userQuery.selected = '';
        console.log(await deleteCardById(g[0].selectedId))
      }
      console.log(await putUserById(userId, userQuery));
    }
    res.send(game)
  } catch(err) {
    next(err);
  }
})

router.put('/:gameId/turn', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const user = await getUserById(userId);
    if (!user) throw new BadRequest('Invalid user');
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
    const { players, completed, attributes, turn, output, coins } = roundResponse;
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
    if (completed) {
      const userQuery = { coins: coins + user.coins };
      if (user.intro) {
        userQuery.intro = false;
        userQuery.selected = '';
        console.log(await deleteCardById(g[0].selectedId))
      }
      console.log(await putUserById(userId, userQuery));
    }
    res.send(game)
  } catch(err) {
    next(err);
  }
});



module.exports = router;