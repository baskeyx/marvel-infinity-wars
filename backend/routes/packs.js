const express = require('express');
const { getPacks, getPackById, createPack } = require('../functions/Packs');
const { getUserById } = require('../functions/Users');
const getId = require('../functions/getId')
const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  let query = {};
  if (!userId) {
    // not yet a user?
  } else {
    const user = await getUserById(userId);
    if (user.intro) {
      query = { id: 'd556e6b5-7917-46ad-b02b-65bc3923cbbe' };
    } else {
      query = { id: { $ne: 'd556e6b5-7917-46ad-b02b-65bc3923cbbe' } };
    }
  }
  const packs = await getPacks(query);
  res.send(packs);
});

// router.get('/', async (req, res) => {
//   const packsResponse = await createPack({
//     id: getId(),
//     chars: [1011010],
//     cost: 1,
//     name: 'Intro Pack',
//     description: 'Get a powerful recruit to join your team temporarily.'
//   })
//   console.log(packsResponse)
//   res.send(packsResponse);
// });

module.exports = router;