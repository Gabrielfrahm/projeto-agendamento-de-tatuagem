import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import uploadConfig from '@config/upload';
import multer from 'multer';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CustomerController from '../controllers/CustomerController';
import CustomerAvatarController from '../controllers/CustomerAvatarController';

const customerRouter = Router();
const upload = multer(uploadConfig.multer);

const customerController = new CustomerController();
const customerAvatarController = new CustomerAvatarController();

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  customerController.create,
);

customerRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  customerAvatarController.update,
);

export default customerRouter;
