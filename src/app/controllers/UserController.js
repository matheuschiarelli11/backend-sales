const { v4: uuid } = require('uuid');

const User = require('../models/User');

const UserController = {
  async create(req, res) {
    const { company_id } = req.params;
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Informe um nome' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Informe um e-mail' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Informe uma senha' });
    }

    // TODO
    // verificar se usuário com o mesmo e-mail já existe no banco

    console.log(company_id);

    const user = await User.create({
      id: uuid(),
      name,
      email,
      password,
      company_id,
    });

    return res.status(200).json(user);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ message: 'Usuário inexistente.' });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    await user.save();

    return res.status(200).json(user);
  },

  async delete(req, res) {
    return res.status(400).json({ ok: true });
  },

  async show(req, res) {
    return res.status(400).json({ ok: true });
  },
};

module.exports = UserController;
