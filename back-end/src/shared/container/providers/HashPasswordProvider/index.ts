import { container } from 'tsyringe';

import IHashPasswordProvider from './models/IHashPasswordProvider';
import HashPasswordProvider from './implementations/HashPasswordProvider';

container.registerSingleton<IHashPasswordProvider>(
  'HashPasswordProvider',
  HashPasswordProvider,
);
