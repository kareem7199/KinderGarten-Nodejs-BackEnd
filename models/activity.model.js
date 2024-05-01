import db from "../config/db.js"
import {DataTypes} from "sequelize"

export default db.define("activities", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    grade: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0
    },
    fullMark: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0
    } ,
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },

}, {
    tableName: "activities",
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
