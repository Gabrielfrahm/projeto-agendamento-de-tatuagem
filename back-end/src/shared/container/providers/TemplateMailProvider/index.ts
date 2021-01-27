import { container } from 'tsyringe';
import ITemplateMailProvider from './models/ITemplateMailProvider';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

// const providers = {
//   handlebars: handlebarMailTemplateProvider,
// };

// provedor de template para emails
container.registerSingleton<ITemplateMailProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
