import { inject, injectable } from 'tsyringe';
import path from 'path';
import IUserTokenRepository from '@modules/userToken/repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/error/AppError';
import ICustomerRepository from '../repositories/ICustomerRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('customer don`t existing');
    }

    const { token } = await this.userTokenRepository.generateCustomerToken(
      customer.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: customer.name,
        email: customer.email,
      },
      subject: '[Equipe Tattoo] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: customer.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
