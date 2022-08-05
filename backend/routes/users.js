const express = require('express');
const router = express.Router();
const getId = require('../functions/getId');
const { getUserById, createUserWithId } = require('../functions/Users');

router.get('/', async (req, res) => {
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
});

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