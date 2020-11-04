const users = [];
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserController = {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Por favor, informe um nome' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Por favor, informe um e-mail' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Por favor, informe uma senha' });
    }

    const userExists = users.find(element => element.email === email);

    if (userExists) {
      return res.status(400).json({ message: 'Esse email já está em uso.' });
    }

    // const user = {
    //   id: uuid(),
    //   name,
    //   email,
    //   password,
    // };

    const user = await User.create({
      id: uuid(),
      name,
      email,
      password,
    });

    // users.push(user);

    return res.status(200).json(user);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // const index = users.findIndex(function findUser(user){
    //     if(user.id === id){
    //         return user;
    //     }
    // });

    const index = users.findIndex(user => user.id === id);

    if (index < 0) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    if (name) {
      users[index].name = name;
    }

    if (email) {
      users[index].email = email;
    }

    if (password) {
      users[index].password = password;
    }

    return res.status(200).json(users[index]);
  },

  async delete(req, res) {
    // const { email } = req.body;

    // users.find(function Destroy(element) {
    //   const findId = element.id;

    //   if (findId === email) {
    //     users.splice(users.indexOf(findId), 1);

    //     return res.status(200).json({ message: 'Usuário excluido.' });
    //   }
    // });

    return res.status(400).json({ message: 'Usuario não encontrado' });
  },

  async show(req, res) {
    return res.status(200).json(users);
  },

  async UserEmail(req, res) {
    const { email } = req.body;
    console.log(email);

    const result = users.find(element => email === element.email);

    // const result =  users.find(function getElement(element){
    //     if (email === element.email) {
    //         return element;
    //     }
    // });

    if (!result) {
      return res.status(400).json('Não houve resultados.');
    }

    return res.status(200).json(result);
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Envie um email' });
    }

    const userFound = users.find(user => user.email === email);

    if (!userFound) {
      return res.status(400).json({ message: 'usuário inexistente' });
    }

    if (userFound.password !== password) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: userFound.id }, 'secret', {
      expiresIn: 300,
    });

    delete userFound.password;

    return res.status(200).json({ user: userFound, token });
  },
};

module.exports = UserController;
