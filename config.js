// Database Conniction Info
const Sequelize = require("sequelize");
const config = new Sequelize("planner", "root", "", { dialect: "mariadb" });

module.exports = config;
