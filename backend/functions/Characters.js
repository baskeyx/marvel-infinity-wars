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

// 1009718
// 1011006
// 1009191


// 1009718

// Ant 1010801
// Wasp 1009707
// 1011490

// tmaster 1009648

// const addCharacter = async () => {
//   const input = {
//     id: 1011490,
//     name: "Hank Pym",
//     type: "hero",
//     colour: "purple",
//     stats: {
//       dur: 3,
//       ene: 6,
//       fig: 3,
//       int: 6,
//       spe: 3,
//       str: 7,
//     }
//   }
  
//   let total = 0;
  
//   for (const [key, value] of Object.entries(input.stats)) {
//     total = total + value;
//   }

//   input.total = total;
  
//   const create = await character.create(input)

//   console.log(create);
  
//   input.total = total;
// }

// addCharacter();

module.exports = { getCharacterById, getRandomCharacter };