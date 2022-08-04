const { pack } = require('../models/Pack.model.js');
const { BadRequest } = require('../utils/errors');

const getPacks = async (query) => await pack.find(query);

const getPackById = async (id) => {
  const packResponse = await pack.find({ id });
  if (!packResponse.length) throw new BadRequest('Invalid Pack ID');
  return packResponse[0];
};

const createPack = async (packDetails) => await pack.create(packDetails);

module.exports = { getPacks, getPackById, createPack };