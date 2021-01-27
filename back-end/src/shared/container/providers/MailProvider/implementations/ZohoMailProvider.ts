import nodemailer, { Transporter } from 'nodemailer';
import mailConfig from '@config/email';
import { inject, injectable } from 'tsyringe';
import ITemplateMailProvider from '../../TemplateMailProvider/models/ITemplateMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class ZohoMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: ITemplateMailProvider,
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_CONFIG_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_CONFIG_USER,
        pass: process.env.ZOHO_CONFIG_PASSWORD,
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
