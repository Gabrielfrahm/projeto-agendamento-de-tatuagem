import { inject, injectable } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import AppError from '@shared/error/AppError';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequestDTO {
  provider_id: string;
  name: string;
  email: string;
  old_password?: string;
  password: string;
  phone: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    provider_id,
    name,
    email,
    old_password,
    password,
    phone,
  }: IRequestDTO): Promise<Provider> {
    const provider = await this.providerRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider not found');
    }
    // acha o email caso ja tenha sendo usado em customer
    const ifCustomerEmail = await this.customerRepository.findByEmail(email);

    if (ifCustomerEmail) {
      throw new AppError('E-mail already user if Customer user');
    }

    // encontra o email
    const providerWithUpdateEmail = await this.providerRepository.findByEmail(
      provider.email,
    );

    // caso o email seja encontrado e ele for diferente do id da pessoa que pediu o reset da erro
    if (providerWithUpdateEmail && providerWithUpdateEmail.id !== provider_id) {
      throw new AppError('E-mail already used');
    }

    provider.email = email;
    provider.name = name;
    provider.phone = phone;

    // se passar a senha mas não passa a senha antiga
    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    // compara as senhas
    if (password && old_password) {
      const checkedPassword = await this.hashPasswordProvider.compareHash(
        old_password,
        provider.password,
      );

      if (!checkedPassword) {
        throw new AppError('Old password does not math');
      }
      provider.password = await this.hashPasswordProvider.generateHash(
        password,
      );
    }

    return this.providerRepository.save(provider);
  }
}

export default UpdateProfileService;
