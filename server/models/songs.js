const Sequelize = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Song = sequelize.define('song', {
    name: Sequelize.STRING,
    artists: Sequelize.STRING,
    danceability: Sequelize.DECIMAL,
    energy: Sequelize.DECIMAL,
    key: Sequelize.INTEGER,
    loudness: Sequelize.DECIMAL,
    mode: Sequelize.INTEGER,
    speechiness: Sequelize.DECIMAL,
    acousticness: Sequelize.DECIMAL,
    instrumentalness: Sequelize.DECIMAL,
    liveness: Sequelize.DECIMAL,
    valence: Sequelize.DECIMAL,
    tempo: Sequelize.DECIMAL,
    duration_ms: Sequelize.INTEGER,
    time_signature: Sequelize.INTEGER,
    rank: Sequelize.INTEGER
},{
    timestamps: false,
});
  

module.exports = { Song }