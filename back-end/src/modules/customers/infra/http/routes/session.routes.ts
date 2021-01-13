import { Router } from 'express';

import SessionsController from '../controllers/SessionController';

const SessionsCustomerRouter = Router();
const sessionController = new SessionsController();

SessionsCustomerRouter.post('/', sessionController.create);

export default SessionsCustomerRouter;
