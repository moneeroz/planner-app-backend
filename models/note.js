const Sequelize = require("sequelize");
const config = require("./../config");

const Note = config.define(
  "note",
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
    details: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    importance: {
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

module.exports = Note;
