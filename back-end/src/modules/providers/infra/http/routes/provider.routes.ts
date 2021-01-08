import { Router } from 'express';
import ProviderController from '../controllers/ProviderController';

const providerRouter = Router();

const providerController = new ProviderController();

providerRouter.post('/', providerController.create);

export default providerRouter;
