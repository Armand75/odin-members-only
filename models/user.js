const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    membership_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

module.exports = User;


