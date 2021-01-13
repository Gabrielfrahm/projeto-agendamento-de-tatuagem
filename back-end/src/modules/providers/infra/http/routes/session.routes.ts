import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const SessionsProviderRouter = Router();
const sessionController = new SessionController();

SessionsProviderRouter.post('/', sessionController.create);

export default SessionsProviderRouter;
