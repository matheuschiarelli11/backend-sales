const { v4: uuid } = require('uuid');

const Company = require('../models/Company');

const CompanyController = {
  async create(req, res) {
    const { name, cnpj } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: 'Informe um nome para a empresa.' });
    }

    if (!cnpj) {
      return res
        .status(400)
        .json({ message: 'Informe um cnpj para a empresa.' });
    }

    // TODO
    // verificar se existe alguma empresa com o mesmo cnpj no banco

    const company = await Company.create({
      id: uuid(),
      name,
      cnpj,
    });

    return res.status(200).json(company);
  },

  async update(req, res) {
    return res.status(200).json({ ok: true });
  },

  async delete(req, res) {
    return res.status(200).json({ ok: true });
  },

  async show(req, res) {
    return res.status(200).json({ ok: true });
  },
};

module.exports = CompanyController;
