const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas','root','Breno*9561',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;