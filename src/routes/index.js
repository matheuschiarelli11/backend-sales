const express = require('express');
const routes = express.Router();
const AutenticationController = require('../controllers/AutenticationController');

routes.get('/', AutenticationController.index)


module.exports = routes;
