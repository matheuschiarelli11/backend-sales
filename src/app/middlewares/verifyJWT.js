const { verify } = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação ausente.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, '8c5557eccef7535ecb8c089bdc4550ab');

    const { user_id } = decoded;

    req.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Token de autenticação inválido.' });
  }
};

module.exports = verifyJWT;
