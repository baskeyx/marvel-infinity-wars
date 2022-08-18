const { event } = require('../models/Event.model.js');
const { BadRequest } = require('../utils/errors');

const getEvents = async (query) => await event.find(query);

const getEventById = async (id) => {
  const eventResponse = await event.find({ id });
  if (!eventResponse.length) throw new BadRequest('Invalid Event ID');
  return eventResponse[0];
}

const createEvent = async () => {
  const query = await event.create({
    id: 270,
    name: 'Secret Wars',
    description: 'Heroes and villains square off with the victor promised their greatest desires!',
    characters: ['*'],
    enemies: ['*'],
    dialog: [{character:'', copy: 'The secret wars match up is made!'}],
  })
  return query;
}

// const addEvent = async () => {
//   const event = await createEvent();
//   console.log(event);
// }

// addEvent();

module.exports = { getEvents, getEventById, createEvent };