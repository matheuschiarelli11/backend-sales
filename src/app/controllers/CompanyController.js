const { v4: uuid } = require('uuid');

const Company = require('../models/Company');

const CompanyController = {
  async create(req, res) {
    try {
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

      const findCnpj = await Company.findOne({ where: { cnpj } });

      if (findCnpj) {
        return res.status(400).json({ message: 'CNPJ já está em uso.' });
      }

      const company = await Company.create({
        id: uuid(),
        name,
        cnpj,
      });

      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const findComp = await Company.findByPk(id);

      if (!findComp) {
        return res.status(400).json({ message: 'Sem resultados' });
      }

      if (name) {
        findComp.name = name;
      }

      await findComp.save();

      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async delete(req, res) {
    return res.status(200).json({ ok: true });
  },

  async show(req, res) {
    return res.status(200).json({ ok: true });
  },
};

module.exports = CompanyController;
