const Sequelize = require("sequelize");

//module.exports =
let sequelize;
if (process.env.HEROKU_POSTGRESQL_BLUE_URL) {
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: match[4],
    host: match[3],
    logging: true //false
  });
} else {
  sequelize = new Sequelize("yelp", "postgres", "1234", {
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

module.exports = sequelize;
