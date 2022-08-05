const { card } = require('../models/Cards.model.js');

const postCard = async (c) => await card.create(c);

const getCardById = async (id) => {
  const cardResponse = await card.find({ id });
  return cardResponse[0];
}

module.exports = { postCard, getCardById };