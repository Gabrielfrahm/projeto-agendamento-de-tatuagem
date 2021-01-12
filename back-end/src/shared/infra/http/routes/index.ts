import { Router } from 'express';

import ProviderRouter from '@modules/providers/infra/http/routes/provider.routes';
import CustomerRouter from '@modules/customers/infra/http/routes/customer.routes';

const routes = Router();

routes.use('/providers', ProviderRouter);
routes.use('/customers', CustomerRouter);

export default routes;
