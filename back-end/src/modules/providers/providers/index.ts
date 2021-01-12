import { container } from 'tsyringe';

import IHashPasswordProvider from './HashPasswordProvider/models/IHashPasswordProvider';
import HashPasswordProvider from './HashPasswordProvider/implementations/HashPasswordProvider';

container.registerSingleton<IHashPasswordProvider>(
  'HashPasswordProvider',
  HashPasswordProvider,
);
