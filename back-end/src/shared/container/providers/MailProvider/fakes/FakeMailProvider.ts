import ISendEmail from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendEmail[] = [];

  public async sendMail(message: ISendEmail): Promise<void> {
    this.messages.push(message);
  }
}
