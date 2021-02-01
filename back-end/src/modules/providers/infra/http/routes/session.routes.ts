import { Router } from 'express';

import { Joi, celebrate, Segments } from 'celebrate';

import SessionController from '../controllers/SessionController';

const SessionsProviderRouter = Router();
const sessionController = new SessionController();

SessionsProviderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default SessionsProviderRouter;
