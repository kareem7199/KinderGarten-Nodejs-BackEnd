const { Sequelize } = require("sequelize");

const sequalize = new Sequelize({
  host: process.env.HOST || "localhost",
  dialect: "mysql",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_DATABASE || "kindergarten",
});

module.exports = sequalize;
