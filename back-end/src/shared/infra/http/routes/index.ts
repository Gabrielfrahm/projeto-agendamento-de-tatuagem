import { Router } from 'express';

import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

import SessionsProviderRouter from '@modules/providers/infra/http/routes/session.routes';
import SessionsCustomerRouter from '@modules/customers/infra/http/routes/session.routes';

import ProviderRouter from '@modules/providers/infra/http/routes/provider.routes';
import AppointmentProviderRouter from '@modules/appointments/infra/http/routes/provider.routes';
import ProfileProviderRouter from '@modules/providers/infra/http/routes/profile.routes';

import CustomerRouter from '@modules/customers/infra/http/routes/customer.routes';
import ProfileCustomersRouter from '@modules/customers/infra/http/routes/profile.routes';

import PasswordRouter from '@modules/providers/infra/http/routes/password.routes';
import PasswordCustomerRouter from '@modules/customers/infra/http/routes/password.routes';

const routes = Router();

routes.use('/providers/sessions', SessionsProviderRouter);
routes.use('/customers/sessions', SessionsCustomerRouter);

routes.use('/providers', ProviderRouter);
routes.use('/customers', CustomerRouter);

routes.use('/appointments', AppointmentsRouter);
routes.use('/appointments-providers', AppointmentProviderRouter);

routes.use('/providers', ProfileProviderRouter);
routes.use('/customers', ProfileCustomersRouter);

routes.use('/providers-password', PasswordRouter);
routes.use('/customers-password', PasswordCustomerRouter);

export default routes;
