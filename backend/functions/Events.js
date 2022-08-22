const { event } = require('../models/Event.model.js');
const { BadRequest } = require('../utils/errors');

const getEvents = async (query) => await event.find(query);

const getEventById = async (id) => {
  const eventResponse = await event.find({ id });
  if (!eventResponse.length) throw new BadRequest('Invalid Event ID');
  return eventResponse[0];
}

// Ant 1010801
// Wasp 1009707
// 1011490

// tmaster 1009648


const createEvent = async () => {
  const query = await event.create({
    id: 7058,
    name: 'Avengers (1963) #195',
    description: 'The Avengers break into the Solomon Institute for the Criminally Insane to locate missing team member Wasp.',
    characters: [1010801,1009707,1011490],
    enemies: [1009648],
    dialog: [
      {character:1009707, copy: 'Nice team, people! So what’s our next move?'},
      {character:1010801, copy: 'Well, I for one would like to meet this "Selbe character.."'},
      {character:1011490, copy: 'Lead on, wasp.. Before we get any more little surprises drop in our laps!'},
      {character:1009648, copy: 'I run this little operation.. along with a dozen or so others.'},
      {character:1009648, copy: 'I call it.. Dismemberment 101!'}
    ],
  })
  return query;
}

// const addEvent = async () => {
//   const event = await createEvent();
//   console.log(event);
// }

// addEvent();

module.exports = { getEvents, getEventById, createEvent };