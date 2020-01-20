const Sequelize = require("sequelize");
const db = require("../util/database");

const Restaurant = db.define("restaurant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  adress: {
    type: Sequelize.STRING
  }
});

module.exports = Restaurant;
