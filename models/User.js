//const Sequelize = require("sequelize");
//const db = require("../util/database");

module.exports = (sequelize, Datatypes) => {
  return sequelize.define("user", {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Datatypes.STRING
    },
    email: {
      type: Datatypes.STRING
    },
    password: {
      type: Datatypes.STRING
    }
  });
};
/*const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});*/

//module.exports = User;
