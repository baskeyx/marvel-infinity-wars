const express = require('express');
const getId = require('../functions/getId');
const { putUserById, getUserById } = require('../functions/Users');
const { getCharacterById } = require('../functions/Characters');
const { getPackById } = require('../functions/Packs');
const getRandomInt = require('../functions/getRandomInt');
const { postCard } = require('../functions/Cards');
const { BadRequest } = require('../utils/errors');
const router = express.Router();

router.post('/:packId', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { packId } = req.params;
    const user = await getUserById(userId);
    const pack = await getPackById(packId);
    const newCoins = user.coins - pack.cost;
    let response = {};
    if (newCoins >= 0) {
      const characterId = pack.chars[getRandomInt(0, pack.chars.length - 1)]
      const c = await getCharacterById(characterId);
      const card = {
        id: getId(),
        charId: c.id,
        userId,
        name: c.name,
        stats: c.stats,
        colour: c.colour,
      }
      const cardResponse = await postCard(card);
      const { id, charId, name, stats } = cardResponse;
      response = {id, charId, name, stats}
      let updateUser = user;
      updateUser.coins = newCoins;
      if (user.selected === '') {
        updateUser.selected = id;
      }
      await putUserById(userId, updateUser);
    }
    else {
      throw new BadRequest('You do not have enough coins to purchase this pack');
      //if (!userId) throw new BadRequest('User ID required to start a game');
    }
    res.send(response);
  } catch(err) {
    next(err);
  }
});

module.exports = router;