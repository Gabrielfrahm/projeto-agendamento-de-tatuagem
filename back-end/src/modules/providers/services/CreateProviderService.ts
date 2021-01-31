import { inject, injectable } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import path from 'path';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import AppError from '@shared/error/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    phone,
  }: IRequestDTO): Promise<Provider> {
    const checkProviderExist = await this.providerRepository.findByEmail(email);

    if (checkProviderExist) {
      throw new AppError('Email already used');
    }

    const checkCustomerExist = await this.customerRepository.findByEmail(email);

    if (checkCustomerExist) {
      throw new AppError('Email already used in Customers');
    }

    const hashPassword = await this.hashPasswordProvider.generateHash(password);

    if (phone.length < 11 || phone.length >= 12) {
      throw new AppError('number invalid');
    }

    const provider = await this.providerRepository.create({
      name,
      email,
      password: hashPassword,
      phone,
    });

    // o caminho do template do email
    const createProvider = path.resolve(
      __dirname,
      '..',
      'views',
      'create_providers.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: provider.name,
        email: provider.email,
      },
      subject: '[Equipe Tattoo]',
      templateData: {
        file: createProvider,
        variables: {
          name: provider.name,
          link: `${process.env.APP_WEB_URL}/signIn`,
        },
      },
    });

    return provider;
  }
}

export default CreateProviderService;
