import { container } from 'tsyringe';

// Registrando a injeção de dependência do hash de senha
import './providers';

import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository';

import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

container.registerSingleton<IProviderRepository>(
  'ProviderRepository',
  ProviderRepository,
);

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
