const Sequelize = require("sequelize");
let sequelize;

/*if ((process.env.NODE_ENV = "production")) {
  sequelize = new Sequelize({
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres"
  });
} else {*/
sequelize = new Sequelize(`yelp`, `postgres`, `1234`, {
  host: `localhost`,
  dialect: "postgres",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
//}

module.exports = sequelize;
