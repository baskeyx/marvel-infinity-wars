const express = require('express');
const { getPacks, getPackById, createPack } = require('../functions/Packs');
const { getUserById } = require('../functions/Users');
const getId = require('../functions/getId')
const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.session;
  let query = {};
  if (!userId) {
    // not yet a user?
  } else {
    const user = await getUserById(userId);
    const introId = 'd556e6b5-7917-46ad-b02b-65bc3923cbbe';
    if (user.intro) {
      query = { id: introId };
    } else {
      query = { id: { $ne: introId } };
    }
  }
  const packsResponse = await getPacks(query);
  const packs = [];
  packsResponse.forEach((p) => {
    const { id, name, description, cost } = p;
    packs.push({ id, name, description, cost });
  })
  res.send(packs);
});

// const createPackz = async () => {
//   const packsResponse = await createPack({
//     id: getId(),
//     chars: [],
//     cost: 3,
//     name: 'Basic Pack',
//     description: 'High chance for a low rated hero, slim chance for ultimate hero.'
//   })
//   console.log(packsRes)
// }

// createPackz();

module.exports = router;