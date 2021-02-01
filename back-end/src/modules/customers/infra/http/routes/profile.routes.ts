import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const ProfileRouter = Router();

const profileController = new ProfileController();

ProfileRouter.use(ensureAuthenticated);

ProfileRouter.put(
  '/profile',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password ')),
      phone: Joi.string().required(),
    },
  }),
  profileController.update,
);

export default ProfileRouter;
