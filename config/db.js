const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('top_memebers_only', 'Armand', '123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
});

module.exports = sequelize;