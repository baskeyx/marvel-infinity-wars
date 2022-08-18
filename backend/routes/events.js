const express = require('express');
const { getCardById } = require('../functions/Cards.js');
const { getCharacterById, getRandomCharacter } = require('../functions/Characters.js');
const { getEvents, getEventById } = require('../functions/Events.js');
const { getUserById } = require('../functions/Users.js');
const { BadRequest } = require('../utils/errors');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.session;
    let query = {};
    const user = await getUserById(userId);
    const introId = '6527'
    if (user.intro) {
      query = { id: introId };
    } else {
      query = { id: { $ne: introId } };
    }
    const eventsResponse = await getEvents(query);
    const events = [];
    eventsResponse.forEach((e) => {
      const { id, name, description, characters, enemies } = e;
      events.push({
        name,
        id,
        description,
        characters,
        enemies,
      })
    })
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.get('/:eventId', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const user = await getUserById(userId);
    if (!user.id) throw new BadRequest('User does not exist');
    const { eventId } = req.params;
    const eventResponse = await getEventById(eventId);
    console.log(eventResponse);
    if (!eventResponse.id) throw new BadRequest('Event does not exist');
    const cardResponse = await getCardById(user.selected);
    if (!cardResponse.id) throw new BadRequest('Invalid card selected');
    if (cardResponse.userId !== user.id) throw new BadRequest('Invalid Card selected');
    let enemy = {}
    if (eventResponse.enemies[0] === '*') {
      enemy = await getRandomCharacter({});
    } else {
      enemy = await getCharacterById(eventResponse.enemies[0]);
    }
    if (!enemy.id) throw new BadRequest('Could not load enemy.');
      const dialog = [];
      eventResponse.dialog.forEach(d => {
        let { character, copy } = d;
        if (character === '<player1>') character = cardResponse.charId;
        if (character === '<player2>') character = enemy.id;
        dialog.push({ character, copy })
      });
      if (eventResponse.characters[0] !== '*') {
        if (!eventResponse.characters.includes(cardResponse.charId)) throw new BadRequest('The selected card is not valid for this event.')
      }
      console.log(dialog);
    const { id, name, description } = eventResponse;
    const event = {
      name,
      id,
      description,
      dialog,
    }
    res.send(event);
  } catch(err) {
    next(err);
  }
});

module.exports = router;