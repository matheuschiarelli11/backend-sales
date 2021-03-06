const express = require('express');

const verifyJWT = require('../middlewares/verifyJWT');

const routes = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');
const ProductController = require('../controllers/ProductController');

routes.post('/login', AuthenticationController.create);
routes.post('/user/:company_id', UserController.create);
routes.put('/user/:id', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/users', UserController.show);
routes.post('/company', CompanyController.create);
routes.delete('/company/:id', CompanyController.delete);
routes.get('/company', CompanyController.show);
routes.put('/company/:id', CompanyController.update);
routes.post('/products/:company_id', verifyJWT, ProductController.create);
routes.post('/import-file', verifyJWT, ProductController.readFile);

module.exports = routes;
