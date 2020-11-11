const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const AuthenticationController = {
  async create(req, res) {
    try {
      const { password, email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (user.active === false) {
        return res
          .status(400)
          .json({ message: 'Conta desativada, impossivel realizar um login' });
      }

      if (!user) {
        return res.status(400).json({ error: 'Credenciais incorretas.' });
      }

      if (!(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Credenciais incorretas.' });
      }

      const token = jwt.sign(
        { user_id: user.id },
        '8c5557eccef7535ecb8c089bdc4550ab',
        { expiresIn: '1d' },
      );

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = AuthenticationController;
