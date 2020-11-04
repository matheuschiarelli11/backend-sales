const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const AutenticationController = {
  async create(req, res) {
    const { password, email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuario não encontrado' });
    }

    if (!(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign(
      { user_id: user.id },
      '8c5557eccef7535ecb8c089bdc4550ab',
      {
        expiresIn: '1d',
      },
    );

    return res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  },
};

module.exports = AutenticationController;
