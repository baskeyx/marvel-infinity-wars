const express = require('express');
const getId = require('../functions/getId');
const { putUserById, getUserById } = require('../functions/Users');
const { getCharacterById } = require('../functions/Characters');
const { getPackById } = require('../functions/Packs');
const getRandomInt = require('../functions/getRandomInt');
const { postCard } = require('../functions/Cards');
// const { BadRequest } = require('../utils/errors');
const router = express.Router();

router.post('/:packId', async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { packId } = req.params;
    const user = await getUserById(userId);
    const pack = await getPackById(packId);
    const newCoins = user.coins - pack.cost;
    let response = {};
    console.log(newCoins);
    if (newCoins >= 0) {
      let updateUser = user;
      updateUser.coins = newCoins;
      // await putUserById(userId, updateUser);
      const characterId = pack.chars[getRandomInt(0, pack.chars.length - 1)]
      const c = await getCharacterById(characterId);
      const card = {
        id: getId(),
        charId: c.id,
        userId,
        name: c.name,
        stats: c.stats,
      }
      const cardResponse = await postCard(card);
      const { id, charId, name, stats } = cardResponse;
      response = ({ id, charId, name, stats });
      console.log(response);
    }
    else {
      if (!userId) throw new BadRequest('User ID required to start a game');
    }
    res.send(response);
  } catch(err) {
    next(err);
  }
});

module.exports = router;