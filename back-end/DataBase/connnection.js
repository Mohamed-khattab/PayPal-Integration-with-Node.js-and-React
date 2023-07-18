const Sequelize = require('sequelize') ; 
const sequelize = new Sequelize('Payment_integrations' ,'root' , 'root',{
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequelize ; 