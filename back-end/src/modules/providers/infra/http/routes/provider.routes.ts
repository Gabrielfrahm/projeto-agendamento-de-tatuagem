import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Joi, celebrate, Segments } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import { Router } from 'express';
import ProviderAvatarController from '../controllers/ProviderAvatarController';
import ProviderController from '../controllers/ProviderController';

const providerRouter = Router();
const upload = multer(uploadConfig.multer);

const providerController = new ProviderController();
const providerAvatarController = new ProviderAvatarController();

providerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  providerController.create,
);

providerRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  providerAvatarController.update,
);

export default providerRouter;
