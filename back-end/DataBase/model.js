const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('./connnection');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}
, {
  modelName: 'User',
  tableName: 'users',
}
);

// Verify password method
// User.prototype.verifyPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };
// set(value) {
//   const hashedPassword = bcrypt.hashSync(value, 10);
//   this.setDataValue('password', hashedPassword);
// },

module.exports = User;
