const Sequelize = require('sequelize');

const User = require('../app/models/User');

const databaseConfig = require('../config/database');

const Company = require('../app/models/Company');
const Product = require('../app/models/Product');

const models = [User, Company, Product];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));

    models.map(
      model => model.associate && model.associate(this.connection.models),
    );
  }
}

module.exports = new Database();
