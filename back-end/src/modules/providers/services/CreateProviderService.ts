import { inject, injectable } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';

import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import AppError from '@shared/error/AppError';
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

    return provider;
  }
}

export default CreateProviderService;
