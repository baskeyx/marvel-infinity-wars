const { dialog } = require('../models/Dialog.model.js');

const getDialogById = async (id) => {
  const dialogResponse = await dialog.find({ id })
  return dialogResponse[0];
};

const postDialog = async (d) => await dialog.create(d);

module.exports = { getDialogById, postDialog };