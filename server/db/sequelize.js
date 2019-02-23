const Sequelize = require('sequelize');

Sequelize.Promise = global.Promise

const database = process.env.DB_NAME || 'SpotifyChart'
const username = process.env.DB_USER || 'root'
const password = process.env.DB_PASSWORD || 'root'
const host = process.env.DB_HOST || 'localhost'
const port = process.env.DB_PORT || 3306

const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});

module.exports = { sequelize }