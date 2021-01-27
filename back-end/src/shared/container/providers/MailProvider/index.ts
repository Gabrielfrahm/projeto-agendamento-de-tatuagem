import { container } from 'tsyringe';

import mailConfig from '@config/email';
import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import ZohoMailProvider from './implementations/ZohoMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  zoho: container.resolve(ZohoMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
