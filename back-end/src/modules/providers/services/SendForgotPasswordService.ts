import { inject, injectable } from 'tsyringe';
import path from 'path';
import IUserTokenRepository from '@modules/userToken/repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/error/AppError';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const provider = await this.providerRepository.findByEmail(email);

    if (!provider) {
      throw new AppError('provider don`t existing');
    }

    const { token } = await this.userTokenRepository.generateProviderToken(
      provider.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: provider.name,
        email: provider.email,
      },
      subject: '[Equipe Tattoo] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: provider.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
