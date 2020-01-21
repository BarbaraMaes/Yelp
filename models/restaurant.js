//const Sequelize = require("sequelize");
//const db = require("../util/database");

//const Restaurant = db
module.exports = (sequelize, Datatypes) => {
  return sequelize.define("restaurant", {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Datatypes.STRING
    },
    adress: {
      type: Datatypes.STRING
    },
    image: {
      type: Datatypes.STRING
    },
    description: {
      type: Datatypes.STRING
    }
  });
};

//module.exports = Restaurant;
