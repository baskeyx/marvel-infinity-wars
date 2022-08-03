const express = require('express');
const { getPacks, getPackById, createPack } = require('../functions/Packs');
const { getUserById } = require('../functions/Users');
const router = express.Router();

// router.get('/', async (req, res) => {
//   const userId = req.session.userId;
//   let packs = {};
//   if (!userId) {
//     // not yet a user?
//   } else {
//     const user = getUserById(id);
//     if (user.intro) {
//       packs = await getPackById(1);
//     } else {
//       packs = await getPacks();
//     }
//   }
//   res.send(packs);
// });

router.get('/', async (req, res) => {
  const packsResponse = await createPack({
    id: 1,
    chars: [1011010],
    cost: 1,
    name: 'Intro Pack',
    description: 'Get a powerful recruit to join your team temporarily.'
  })
  res.send(packsResponse);
});

module.exports = router;

// const query = await event.create({
//   id: 6527,
//   name: 'The Amazing Spider-Man (1963) #14',
//   description: 'The first major battle between Spidey and his archnemesis, the Green Goblin!',
//   characters: [1011010],
//   enemies: [1011435],
//   dialog: [{
//     character: '<player1>',
//     copy: 'Hold it, fella!!'
//   },
//   {
//     character: '<player1>',
//     copy: 'How about giving a guy a lift?',
//   },
//   {
//     character: '1011435',
//     copy: 'Spider-Man!! I’ve been waiting for you!!'
//   },
//   {
//     character: '1011435',
//     copy: 'I knew if I flew around the city, you’d be sure to investigate sooner or later!',
//   },
//   {
//     character: '<player1>',
//     copy: 'The Green Goblin!!'
//   },
//   {
//     character: '1011435',
//     copy: 'Why don’t you quit now, Spider-Man, and save us both a lot of trouble?!!'
//   },
//   {
//     character: '<player1>',
//     copy: 'I don’t think so Gobby!!',
//   }],
// })