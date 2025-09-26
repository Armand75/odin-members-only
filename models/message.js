const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Message.belongsTo(User, { foreignKey: 'user_id'});

module.exports = Message;