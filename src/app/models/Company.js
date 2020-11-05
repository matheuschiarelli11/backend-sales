const Sequelize = require('sequelize');

class Company extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cnpj: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Company;
