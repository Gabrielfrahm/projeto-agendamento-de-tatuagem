import { container } from 'tsyringe';

import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository';

container.registerSingleton<IProviderRepository>(
  'ProviderRepository',
  ProviderRepository,
);
