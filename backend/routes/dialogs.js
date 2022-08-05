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
//       character: '1011010',
//       copy: 'Ah, I remember this one like it was yesterday!',
//     },
//     {
//       character: '1011010',
//       copy: 'What are you waiting for?!',
//     },
//     {
//       character: '1011010',
//       copy:  'Click the event to start it!',
//     }
//   ]}
//   const dialogResponse = await postDialog(dialog)
//   console.log(dialogResponse);
// }

// test();

module.exports = router;