const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AutenticationController = {
  async create(req, res) {
    const { password, email } = req.body;

    console.log(email);

    const result = await User.findOne({ where: { email } });

    if (!result) {
      return res.status(400).json({ error: 'Usuario não encontrado' });
    }

    if (!(await User.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const { id, name } = result;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, '8c5557eccef7535ecb8c089bdc4550ab', {
        expiresIn: '5d',
      }),
    });
  },
};

module.exports = AutenticationController;
