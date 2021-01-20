import { Router } from 'express';

import uploadConfig from '@config/upload';
import multer from 'multer';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CustomerController from '../controllers/CustomerController';
import CustomerAvatarController from '../controllers/CustomerAvatarController';

const customerRouter = Router();
const upload = multer(uploadConfig.multer);

const customerController = new CustomerController();
const customerAvatarController = new CustomerAvatarController();

customerRouter.post('/', customerController.create);

customerRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  customerAvatarController.update,
);

export default customerRouter;
