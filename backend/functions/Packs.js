const { pack } = require('../models/Pack.model.js');

const getPacks = async (query) => await pack.find(query);

const getPackById = async (id) => {
  const packResponse = await pack.find({ id });
  return packResponse[0];
};

const createPack = async (packDetails) => await pack.create(packDetails);

module.exports = { getPacks, getPackById, createPack };