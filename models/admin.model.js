import db from "../config/db.js"
import {DataTypes} from "sequelize"


export default db.define("admins", {
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
