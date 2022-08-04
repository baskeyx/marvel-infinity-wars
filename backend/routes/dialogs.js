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
//   dialog: [{
//     copy: 'Would you look at that!',
//     character: '1011010',
//   },
//   {
//     copy: 'Looks like we’re in this together!',
//     character: '1011010',
//   },
//   {
//     copy: 'Now let’s take on an event!',
//     character: '1011010',
//   },
//   {
//     copy: 'Click on the ’events’ tab and let’s see what’s available.',
//     character: '1011010',
//   }],
// }


// const dialogResponse = await postDialog(dialog)
// console.log(dialogResponse);
// }

// test();

module.exports = router;