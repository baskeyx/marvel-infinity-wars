const { character } = require('../models/Character.model.js');
const getRandomInt = require('./getRandomInt.js');
const getRandomStats = require('./getRandomStats');

const getCharacterById = async (charId) => {
  const query = await character.find({ id: charId });
  const { name, colour, stats, id } = query[0];
  const characterResponse = {
    name,
    colour,
    id,
    stats: getRandomStats(stats),
  }
  return characterResponse;
}

const getRandomCharacter = async (query) => {
  const characterResponse = await character.find(query);
  const randomInt = getRandomInt(0, characterResponse.length - 1);
  console.log(characterResponse.length, randomInt) 
  const { name, colour, stats, id } = characterResponse[randomInt];
  const c = {
    name,
    colour,
    id,
    stats: getRandomStats(stats),
  }
  return c;
}

// const updateCharacters = async () => {
//   const query = await character.updateMany({},{$set: {'playable':false}})
//   console.log(query);
// }

// updateCharacters()

// const findCharacters = async () => {
//   console.log(await (await character.find({total: { $gt: 30  }})).length);
// }

// findCharacters()

// const addCharacter = async () => {
//   const input = {
//     id: 1011025,
//     name: "Thor",
//     type: "hero",
//     colour: "orange",
//     stats: {
//       dur: 7,
//       ene: 7,
//       fig: 7,
//       int: 7,
//       spe: 7,
//       str: 7,
//     }
//   }
  
//   let total = 0;
  
//   for (const [key, value] of Object.entries(input.stats)) {
//     total = total + value;
//   }

//   const create = await character.create(input)

//   console.log(create);
  
//   input.total = total;
// }

// addCharacter();

module.exports = { getCharacterById, getRandomCharacter };