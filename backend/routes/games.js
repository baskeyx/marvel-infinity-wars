const express = require('express');
const { getCardById } = require('../functions/Cards');
const { getCharacterById } = require('../functions/Characters');
const { getEventById } = require('../functions/Events');
const { postGame, getGame, putGame, hidePlayersAttributes } = require('../functions/Games');
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
      if (!turn) dialog.push({character: '', copy:'Select an attribute!'});
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
    let { id, eventId, selectedId, players, completed, attributes, started, turn, output } = g[0];
    if (completed) throw new BadRequest('Game has been completed');    
    players[1].stats = hidePlayersAttributes(players[1].stats, attributes);
    res.send({ id, userId, eventId, selectedId, players, completed, attributes, started, turn, output }) 
  } catch(err) {
    next(err);
  }
});

router.put('/:gameId/attribute/:attribute', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { gameId, attribute } = req.params;
    const g = await getGame({id: gameId , userId});
    if (!g[0]) throw new BadRequest('Invalid game ID');
    let { id, eventId, selectedId, players, completed, attributes, started, turn } = g[0];
    if (turn) throw new BadRequest('Not your go pal');
    if (completed) throw new BadRequest('Game has been completed');
    // check attribute hasn't been selected already
    if (attributes.includes(attribute)) throw new BadRequest('Attribute already selected');
    const dialog = [];
    // get stat
    dialog.push({character: '', copy: `${players[0].name} plays the ${attribute} attribute!`});
    const score = players[0].stats[attribute] - players[1].stats[attribute];
    if (score > 0) {
      players[1].hp -= score;
      dialog.push({ character: '', copy: `${players[0].name} beats ${players[1].name} by ${score} points!` });
      if (players[1].hp < 0) {
        players[1].hp = 0;
        completed = true;
        dialog.push({ character: '', copy: `${players[0].name} defeats ${players[1].name}!!`})
      }
    } else if (score < 0) {
      players[0].hp += score;
      dialog.push({ character: '', copy: `${players[1].name} beats ${players[0].name} by ${score*-1} points!` });
      if (players[0].hp < 0) {
        players[0].hp = 0;
        completed = true;
        dialog.push({ character: '', copy: `${players[1].name} defeats ${players[0].name}!!`})
      }
    } else {
      dialog.push({ character: '', copy: `It's a tie!` });
    }
    attributes.push(attribute);
    turn = !turn;
    const putGameResponse = await putGame({ id }, {
      players,
      completed,
      attributes,
      turn,
      output: [{character: '', copy: 'Choose an attribute!'}]
    })
    players[1].stats = hidePlayersAttributes(players[1].stats, attributes);
    const game = {
      id,
      eventId,
      selectedId,
      players,
      completed,
      attributes,
      turn,
      output: dialog
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
    let { id, eventId, selectedId, players, completed, attributes, started, turn } = g[0];
    if (!turn) throw new BadRequest('Not CPU turn');
    if (completed) throw new BadRequest('Game has been completed');
    // get player stat
    const dialog = [];
    const { stats } = players[1];
    let highest = {
      stat: 0,
      attribute: '',
    }
    for (const [key, value] of Object.entries(stats)) {
      console.log()
      if (value > highest.stat && !attributes.includes(key)) highest = {stat: value, attribute: key}
    }
    dialog.push({character: '', copy: `${players[1].name} plays the ${highest.attribute} attribute!`});
    const score = players[0].stats[highest.attribute] - stats[highest.attribute];
    if (score > 0) {
      players[1].hp -= score;
      dialog.push({ character: '', copy: `${players[0].name} beats ${players[1].name} by ${score} points!` });
      if (players[1].hp < 0) {
        players[1].hp = 0;
        completed = true;
        dialog.push({ character: '', copy: `${players[0].name} defeats ${players[1].name}!!`})
      }
    } else if (score < 0) {
      players[0].hp += score;
      dialog.push({ character: '', copy: `${players[1].name} beats ${players[0].name} by ${score*-1} points!` });
      if (players[0].hp < 0) {
        players[0].hp = 0;
        completed = true;
        dialog.push({ character: '', copy: `${players[1].name} defeats ${players[0].name}!!`})
      }
    } else {
      dialog.push({ character: '', copy: `It's a tie!` });
    }
    attributes.push(highest.attribute);
    turn = !turn;
    const putGameResponse = await putGame({ id }, {
      players,
      completed,
      attributes,
      turn,
      output: [{character: '', copy: 'Choose an attribute!'}]
    })
    players[1].stats = hidePlayersAttributes(players[1].stats, attributes);
    const game = {
      id,
      eventId,
      selectedId,
      players,
      completed,
      attributes,
      turn,
      output: dialog
    }
    res.send(game)
  } catch(err) {
    next(err);
  }
});

module.exports = router;