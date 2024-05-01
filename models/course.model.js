import db from "../config/db.js"
import {DataTypes} from "sequelize"


export default db.define("courses", {
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
