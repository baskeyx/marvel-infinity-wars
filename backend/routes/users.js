const express = require('express');
const { getCardById } = require('../functions/Cards');
const router = express.Router();
const { BadRequest } = require('../utils/errors');
const getId = require('../functions/getId');
const { getUserById, createUserWithId, putUserById } = require('../functions/Users');

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.userId;
    let userResponse = {};
    if (!userId) {
      const userId = getId();
      req.session.userId = userId;
      userResponse = await createUserWithId(userId);
    } else {
      userResponse = await getUserById(userId);
    }
    const { id, coins, intro, selected } = userResponse;
    res.send({id, coins, intro, selected });
  } catch(err) {
    next(err);
  }
});

router.put('/selected/:cardId', async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const userId = req.session.userId;
    const user = await getUserById(userId);
    if (!user) throw new BadRequest('Invalid user');
    const card = await getCardById(cardId);
    if (!card.id || card.userId !== userId) throw new BadRequest('Invalid card');
    const cardSelectResponse = await putUserById(userId, { selected: cardId });
    res.send({id: cardId});
  } catch(err) {
    next(err);
  }
})

// router.get('/:userId', async (req, res) => {

//   const { userId } = req.params;
//   console.log(req.session);
//   if(req.session.page_views){
//     req.session.page_views++;
//   } else {
//     req.session.page_views=1;
//   }
//   console.log(req.session.page_views);
//   const userResponse = await getUserById(userId);
//   const { id, coins, intro } = userResponse;
//   res.send({id, coins, intro});
// });

module.exports = router;