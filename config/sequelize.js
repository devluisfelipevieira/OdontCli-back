const { Sequelize } = require("sequelize");
const database = require("./config");
const sequelize = new Sequelize(database);

//importando o objeto Sequelize contendo os arquivos do database tornando-os assim manipulaveis
module.exports = sequelize;
