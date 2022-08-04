const express = require('express');
const {
  // postDialog,
  getDialogById,
} = require('../functions/Dialogs');
//const getId = require('../functions/getId')
const router = express.Router();

router.get('/:dialogId', async (req, res) => {
  const { dialogId } =  req.params
  const dialogResponse = await getDialogById(dialogId);
  const { id, dialog } = dialogResponse;
  res.send({ id, dialog });
});

// router.get('/', async (req, res) => {
//   const dialog = {
//     id: getId(),
//     dialog: [{
//       character: '1011010',
//       copy: 'Here you can open packs to recruit new heroes to your team!',
//     },
//     {
//       character: '1011010',
//       copy: 'Above you can see the Intro Pack which costs 1 Credit.',
//     },
//     {
//       character: '1011010',
//       copy: 'Select that pack by clicking on it!',
//     }],
//   }
//   const dialogResponse = await postDialog(dialog)
//   console.log(dialogResponse);
//   res.send(dialogResponse);
// });

module.exports = router;