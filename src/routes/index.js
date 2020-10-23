const express = require('express');
const routes = express.Router();
const AutenticationController = require('../controllers/AutenticationController');
const UserController = require('../controllers/UserController');

routes.post('/login', AutenticationController.create);
routes.post('/user', UserController.create);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/user', UserController.show);
routes.get('/email', UserController.UserEmail);


module.exports = routes;
