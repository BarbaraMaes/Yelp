const Sequelize = require("sequelize");
const pg = require("pg");
let sequelize;

/*if ((process.env.NODE_ENV = "production")) {
sequelize = new Sequelize(
  `d6brb84vpoto1j`,
  `bvwjdrxqrrslpg`,
  `d8451bfc9e65fa7f3640a197b4a8145ba8beebb5b2f3cb707912d9dd19b4217a`,
  {
    host: `ec2-54-247-188-107.eu-west-1.compute.amazonaws.com`,
    dialect: "postgres",
    operatorsAliases: false,
    uri:
      "postgres://bvwjdrxqrrslpg:d8451bfc9e65fa7f3640a197b4a8145ba8beebb5b2f3cb707912d9dd19b4217a@ec2-54-247-188-107.eu-west-1.compute.amazonaws.com:5432/d6brb84vpoto1j",
    port: "5432",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
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
  */

pg.defaults.ssl = true;
sequelize = new Sequelize(
  `dak95c4034e26e`,
  `nxljgqupvqbvqe`,
  `471a88f316360528d017f9af306bca8d73dae6eaaa80976eed3afa57d53b0aef`,
  {
    host: `ec2-54-247-74-242.eu-west-1.compute.amazonaws.com`,
    dialect: "postgres",
    operatorsAliases: false,
    uri:
      "postgres://nxljgqupvqbvqe:471a88f316360528d017f9af306bca8d73dae6eaaa80976eed3afa57d53b0aef@ec2-54-247-74-242.eu-west-1.compute.amazonaws.com:5432/dak95c4034e26e",
    port: "5432",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
//}

module.exports = sequelize;
