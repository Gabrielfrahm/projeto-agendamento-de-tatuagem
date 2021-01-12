import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';

const customerRouter = Router();

const customerController = new CustomerController();

customerRouter.post('/', customerController.create);

export default customerRouter;
