const { mongoose } = require('../connectors/mongoose');

const game = mongoose.model('Games', mongoose.Schema({
  id: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  selectedId: { type: String, required: true },
  players: { type: Array },
  completed: { type: Boolean, default: false },
  attributes: { type: Array, default: [] },
  output: { type: Array },
  started: { type: Boolean, default: false },
  turn: { type: Boolean, required: true },
  time : { type : Number, default: Date.now() },
}));

exports.game = game;