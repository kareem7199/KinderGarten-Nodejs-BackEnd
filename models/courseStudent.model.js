const db = require("../config/db")
const { DataTypes } = require("sequelize")

module.exports = db.define("coursestudent", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    isPaid : {
        type : DataTypes.BOOLEAN ,
        defaultValue : false
    } ,
    isFinished : {
        type : DataTypes.BOOLEAN ,
        defaultValue : false
    } ,
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },

}, {
    tableName: "coursestudent",
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});
