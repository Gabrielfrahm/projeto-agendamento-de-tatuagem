import IMailtemplateProvider from '../models/ITemplateMailProvider';

export default class FakeMailTemplateProvider implements IMailtemplateProvider {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}
