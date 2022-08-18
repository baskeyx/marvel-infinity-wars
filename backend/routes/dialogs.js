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
//       copy: 'And that’s it.. You’ve got the basics of Infinity Wars!',
//       character: '1011010',
//     },
//     {
//       copy: 'I’ve gotta shoot as I promised Aunt May I’d help her out with some chores.',
//       character: '1011010',
//     },
//     {
//       copy: 'But you should get on fine without me!',
//       character: '1011010',
//     },
//     {
//       copy: 'Remember two things:',
//       character: '1011010',
//     },
//     {
//       copy: 'With great power comes great responsibility!',
//       character: '1011010',
//     },
//     {
//       copy: 'and two, to recruit new heroes head to the recruit section!',
//       character: '1011010',
//     },
//     ]}
//   const dialogResponse = await postDialog(dialog)
//   console.log(dialogResponse);
// }

// test();

module.exports = router;