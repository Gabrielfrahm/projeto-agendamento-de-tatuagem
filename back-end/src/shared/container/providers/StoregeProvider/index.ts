import { container } from 'tsyringe';
// import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

// const providers = {
//   disk: DiskStorageProvider,
// };

// files
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
