const { mongoose } = require('../connectors/mongoose');

const dialog = mongoose.model('Dialogs', mongoose.Schema({
  id: { type: String, unique : true, required : true },
  dialog: { type: Array, required: true },
}));

exports.dialog = dialog;
