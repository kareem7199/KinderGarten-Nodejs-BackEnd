const db = require("../config/db")
const { DataTypes } = require("sequelize")

module.exports = db.define("admins", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },

}, {
    tableName: "admins",
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
