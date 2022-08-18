const express = require('express');
const {
  postDialog,
  getDialogById,
} = require('../functions/Dialogs');
const getId = require('../functions/getId')
const router = express.Router();

router.get('/:dialogId', async (req, res) => {
  const { dialogId } =  req.params
  const dialogResponse = await getDialogById(dialogId);
  const { id, dialog } = dialogResponse;
  res.send({ id, dialog });
});

// const test = async () => {
// const dialog = {
//   id: getId(),
//   dialog: [
//     {
//       copy: 'Here you can view all your recruited heroes and their stats!',
//       character: '1011010',
//     },
//     {
//       copy: 'If you click on a hero you’ll see a red border meaning they’re selected.',
//       character: '1011010',
//     },
//     {
//       copy: 'Click on the Spider-Man card!',
//       character: '1011010',
//     },
//     {
//       copy: 'And now we’re ready to head to an event!',
//       character: '1011010',
//     },
//     {
//       copy: 'Click the ’Events’ tab below to see what’s available!',
//       character: '1011010',
//     },
//     ]}
//   const dialogResponse = await postDialog(dialog)
//   console.log(dialogResponse);
// }

// test();

module.exports = router;