import { container } from 'tsyringe';

// Registrando a injeção de dependência do hash de senha
import '@modules/providers/providers';

import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository';

container.registerSingleton<IProviderRepository>(
  'ProviderRepository',
  ProviderRepository,
);
