import db from "../config/db.js"
import {DataTypes} from "sequelize"


export default db.define("teachers", {
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
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        // unique: true
    },
    salary: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    profilePicture: {
        type: DataTypes.STRING(255),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('profilePicture');
            return rawValue ? `${process.env.BASEURL}/uploads/teachers/${rawValue}` : null;
          }
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
    tableName: "teachers",
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
