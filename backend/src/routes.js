const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const PersoDataController = require('./controllers/PersoDataController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/profiles', UserController.index);

routes.post(
  '/profiles',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      age: Joi.string().required().max(2),
      cpf: Joi.string().required().max(11),
      rg: Joi.string().required().max(7),
    }),
  }),
  UserController.create
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

routes.get(
  '/comments',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  PersoDataController.index
);
routes.post('/comments', PersoDataController.create);

routes.delete(
  '/comments/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  PersoDataController.delete
);

module.exports = routes;
