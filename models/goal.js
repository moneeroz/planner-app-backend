const Sequelize = require("sequelize");
const config = require("./../config");

const Goal = config.define(
  "goal",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deleted: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false },
);

module.exports = Goal;
