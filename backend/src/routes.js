const express = require('express');

const UserController = require('./controllers/UserController');
const PersoDataController = require('./controllers/PersoDataController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/profiles', UserController.index);
routes.post('/profiles', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/persoData', PersoDataController.index);
routes.post('/persoData', PersoDataController.create);
routes.delete('/persoData/:id', PersoDataController.delete);

module.exports = routes;
