import db from "../config/db.js"
import { DataTypes } from "sequelize"


export default db.define("users", {
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
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    parentPhone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        // unique : true,
    },
    profilePicture: {
        type: DataTypes.STRING(255),
        allowNull: false ,
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },

}, {
    tableName: "users",
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
