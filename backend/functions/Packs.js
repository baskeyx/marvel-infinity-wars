const { pack } = require('../models/pack.model.js');

const getPacks = async () => await pack.find();

const getPackById = async (id) => await pack.find({ id });

const createPack = async (packDetails) => await pack.create(packDetails);

module.exports = { getPacks, getPackById, createPack };