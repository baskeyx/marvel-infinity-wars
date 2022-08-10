const { user } = require('../models/User.model.js');
const { BadRequest } = require('../utils/errors');

const createUserWithId = async (id) => await user.create({ id });

const getUserById = async (id) => {
  const userResponse = await user.find({ id });
  if (!userResponse[0]) throw new BadRequest('Invalid User ID')
  return userResponse[0];
}

const putUserById = async (id, userDetails) => await user.updateOne({id}, userDetails);

module.exports = { getUserById, putUserById, createUserWithId };