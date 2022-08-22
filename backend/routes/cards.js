const express = require('express');
const getId = require('../functions/getId');
const { putUserById, getUserById } = require('../functions/Users');
const { getCharacterById, getRandomCharacter } = require('../functions/Characters');
const { getPackById } = require('../functions/Packs');
const getRandomInt = require('../functions/getRandomInt');
const { postCard, getCardsByUserId } = require('../functions/Cards');
const { BadRequest } = require('../utils/errors');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const cardsResponse = await getCardsByUserId(userId);
    res.send(cardsResponse);
  } catch(err) {
    next(err);
  }
})

router.post('/:packId', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { packId } = req.params;
    const user = await getUserById(userId);
    const pack = await getPackById(packId);
    const newCoins = user.coins - pack.cost;
    let response = {};
    let c = {};
    if (newCoins >= 0) {
      if (packId === '7405ad99-fea3-4320-bdf8-e9637aae0d8c') {
        const randomInt = getRandomInt(0, 100);
        let query = {};
        if (randomInt <= 90) {
          query = {total: { $lt: 21  }}
        } else if (randomInt <= 99) {
          query = {total: { $gt: 20, $lt: 31  }}
        } else {
          query = {total: { $gt: 30  }}
        }
        c = await getRandomCharacter(query);
      } else {
        const characterId = pack.chars[getRandomInt(0, pack.chars.length - 1)]
        c = await getCharacterById(characterId);
      }
      const card = {
        id: getId(),
        charId: c.id,
        userId,
        name: c.name,
        stats: c.stats,
        colour: c.colour,
      }
      const cardResponse = await postCard(card);
      const { id, charId, name, stats, colour } = cardResponse;
      response = {id, charId, name, stats, colour}
      let updateUser = user;
      updateUser.coins = newCoins;
      if (user.selected === '') {
        updateUser.selected = id;
      }
      await putUserById(userId, updateUser);
    }
    else {
      throw new BadRequest('You do not have enough coins to purchase this pack');
    }
    res.send(response);
  } catch(err) {
    next(err);
  }
});

module.exports = router;