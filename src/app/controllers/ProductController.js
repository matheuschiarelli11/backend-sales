const { v4: uuid } = require('uuid');
const fs = require('fs');

const Product = require('../models/Product');

const ProductController = {
  async create(req, res) {
    const { company_id } = req.params;
    const { product_name, type, code, quantity, custom_field } = req.body;

    if (!product_name) {
      return res
        .status(400)
        .json({ message: 'Informe um nome para o produto' });
    }

    if (!type) {
      return res.status(400).json({ message: 'Informe um tipo' });
    }

    if (!code) {
      return res
        .status(400)
        .json({ message: 'Informe um codigo para o produto' });
    }
    if (!quantity) {
      return res.status(400).json({ message: 'Informe a quantidade' });
    }

    const product = await Product.create({
      id: uuid(),
      company_id,
      product_name,
      type,
      code,
      quantity,
      custom_field,
    });
    return res.status(200).json(product);
  },
  async readFile(req, res) {
    fs.writeFile(
      `./src/tmp/${req.files.product_file.name}`,
      req.files.product_file.data,

      function (err) {
        if (err) {
          console.log(err);
        }

        console.log('Ok');
      },
    );

    return res.status(200).json({});
  },
};

module.exports = ProductController;
