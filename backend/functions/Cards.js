const { card } = require('../models/Cards.model.js');

const postCard = async (c) => await card.create(c);

const getCardById = async (id) => {
  const cardResponse = await card.find({ id });
  return cardResponse[0];
}

const getCardsByUserId = async (userId) => await card.find({ userId });

const deleteCardById = async (id) => await card.remove({ id })

module.exports = { postCard, getCardById, getCardsByUserId, deleteCardById };