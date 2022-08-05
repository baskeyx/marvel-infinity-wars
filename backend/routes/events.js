const express = require('express');
const { getEvents, getEventById } = require('../functions/Events.js');
const { getUserById } = require('../functions/Users.js');
const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.session;
  let query = {};
  if (!userId) {
    // not a user
  } else {
    const user = await getUserById(userId);
    if (user.intro) {
      const introId = '6527'
      query = { id: introId };
    } else {
      query = { id: { $ne: introId } };
    }
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
});

router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const eventResponse = getEventById(eventId);
  const { id, name, description, characters, enemies, dialog } = eventResponse;
  const event = {
    name,
    id,
    description,
    characters,
    enemies,
    dialog,
  }
  res.send(event);
});

module.exports = router;