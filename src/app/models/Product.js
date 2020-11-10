const Sequelize = require('sequelize');

class Product extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        product_name: Sequelize.STRING,
        type: Sequelize.STRING,
        code: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        custom_field: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }
}
module.exports = Product;
