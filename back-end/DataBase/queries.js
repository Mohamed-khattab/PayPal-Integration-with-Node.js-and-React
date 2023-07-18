const User = require('./model');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize'); // Import or define the Sequelize instance


 const createUser= async(name, email, password)=> {
  const user = await User.create({ name, email, password });
  return user;
}

async function findAllUsers() {
  const users = await User.findAll();
  return users;
}

async function findUserById(userId) {
  const user = await User.findByPk(userId);
  return user;
}

async function findUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function updateUser(userId, name) {
  await User.update({ name }, { where: { id: userId } });
}

async function deleteUser(userId) {
  await User.destroy({ where: { id: userId } });
}

// ...

  module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser,
  };
  