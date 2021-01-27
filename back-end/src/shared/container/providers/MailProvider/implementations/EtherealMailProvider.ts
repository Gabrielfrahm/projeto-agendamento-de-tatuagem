import nodemailer, { Transporter } from 'nodemailer';
import ISendEmail from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({ to, from, subject }: ISendEmail): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Do Tattoo',
        address: from?.email || 'tattoo@tatto.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: 'email teste',
    });

    console.log('Message sent: %s', message.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
