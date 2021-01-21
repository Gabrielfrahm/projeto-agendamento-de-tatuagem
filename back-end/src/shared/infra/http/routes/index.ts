import { Router } from 'express';

import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import SessionsProviderRouter from '@modules/providers/infra/http/routes/session.routes';
import SessionsCustomerRouter from '@modules/customers/infra/http/routes/session.routes';
import ProviderRouter from '@modules/providers/infra/http/routes/provider.routes';
import CustomerRouter from '@modules/customers/infra/http/routes/customer.routes';

const routes = Router();

routes.use('/providers/sessions', SessionsProviderRouter);
routes.use('/customers/sessions', SessionsCustomerRouter);
routes.use('/providers', ProviderRouter);
routes.use('/customers', CustomerRouter);
routes.use('/appointments', AppointmentsRouter);

export default routes;
