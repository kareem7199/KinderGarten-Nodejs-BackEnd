const db = require("../config/db")
const { DataTypes } = require("sequelize")

module.exports = db.define("courses", {
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
    price: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },

}, {
    tableName: "courses",
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
