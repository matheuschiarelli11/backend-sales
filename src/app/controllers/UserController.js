const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const UserController = {
  async create(req, res) {
    try {
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

      const userFound = await User.findOne({ where: { email } });

      if (userFound) {
        return res.status(400).json({ message: 'E-mail já está em uso.' });
      }

      const newUser = await User.create({
        id: uuid(),
        name,
        email,
        password,
        company_id,
      });

      const user = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        company_id: newUser.company_id,
        created_at: newUser.createdAt,
        updated_at: newUser.updatedAt,
      };

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, newPassword } = req.body;

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

      if (password && newPassword) {
        if (!(await bcrypt.compare(password, user.password_hash))) {
          return res.status(401).json({ message: 'Credenciais incorretas.' });
        }

        user.password = newPassword;
      }

      await user.save();

      delete user.password;

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async delete(req, res) {
    return res.status(400).json({ ok: true });
  },

  async show(req, res) {
    return res.status(400).json({ ok: true });
  },
};

module.exports = UserController;
