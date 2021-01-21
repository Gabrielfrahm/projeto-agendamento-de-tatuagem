import { container } from 'tsyringe';

// Registrando a injeção de dependência do hash de senha
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository';

import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IProviderRepository>(
  'ProviderRepository',
  ProviderRepository,
);

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
