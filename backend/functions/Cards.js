const { card } = require('../models/Cards.model.js');

const postCard = async (c) => await card.create(c);

module.exports = { postCard };