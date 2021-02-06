import { container } from 'tsyringe';

import mailConfig from '@config/email';
import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import ZohoMailProvider from './implementations/ZohoMailProvider';

const providers = {
  ethereal: EtherealMailProvider,
  zoho: ZohoMailProvider,
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve<IMailProvider>(providers[mailConfig.driver]),
);
