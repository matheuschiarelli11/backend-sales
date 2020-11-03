const express = require('express');

const routes = express.Router();
const AutenticationController = require('../controllers/AutenticationController');
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');

routes.post('/login', AutenticationController.create);
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/users', UserController.show);
routes.get('/email', UserController.UserEmail);
routes.post('/comp', CompanyController.create);
routes.delete('/comp/:id', CompanyController.delete);
routes.get('/comp', CompanyController.show);
routes.put('/comp/:id', CompanyController.update);

module.exports = routes;
