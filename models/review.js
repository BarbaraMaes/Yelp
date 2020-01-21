//const Sequelize = require("sequelize");
//const db = require("../util/database");

//const Review = db.
module.exports = (sequelize, Datatypes) => {
  return sequelize.define("review", {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    text: {
      type: Datatypes.STRING
    },
    rating: {
      type: Datatypes.INTEGER
    }
  });
};

//module.exports = Review;
