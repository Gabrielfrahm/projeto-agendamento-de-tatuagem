import { container } from 'tsyringe';

// Registrando a injeção de dependência do hash de senha
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository';

import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

import IUserTokenRepository from '@modules/userToken/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/userToken/infra/typeorm/repositories/UserTokensRepository';

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

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
