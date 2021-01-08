import { Router } from 'express';

import ProviderRouter from '@modules/providers/infra/http/routes/provider.routes';

const routes = Router();

routes.use('/providers', ProviderRouter);

export default routes;
