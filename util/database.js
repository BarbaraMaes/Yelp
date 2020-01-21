/*const Sequelize = require("sequelize");

module.exports = new Sequelize("yelp", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});*/
const path = require("path");

if (!global.hasOwnProperty("db")) {
  let Sequelize = require("sequelize"),
    sequelize = null;

  if (process.env.HEROKU_POSTGRESQL_BLUE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BLUE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      port: match[4],
      host: match[3],
      logging: true //false
    });
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize("yelp", "root", "1234", {
      host: "localhost",
      dialect: "mysql",
      operatorsAliases: false,

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    global.db = {
      Sequelize: Sequelize,
      sequelize: sequelize,
      User: sequelize.import(path.join(__dirname, "../", "models", "User")),
      Restaurant: sequelize.import(
        path.join(__dirname, "../", "models", "Restaurant")
      ),
      Review: sequelize.import(path.join(__dirname, "../", "models", "Review"))
      // add your other models here
    };

    global.db.Restaurant.hasMany(global.db.Review);
    global.db.Restaurant.belongsTo(global.db.User);
    global.db.User.hasMany(global.db.Review);
    global.db.User.hasMany(global.db.Restaurant);
    global.db.Review.belongsTo(global.db.User);
    global.db.Review.belongsTo(global.db.Restaurant);
    /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
  }
}

module.exports = global.db;
