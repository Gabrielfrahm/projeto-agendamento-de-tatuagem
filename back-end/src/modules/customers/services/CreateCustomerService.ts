import { inject, injectable } from 'tsyringe';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import AppError from '@shared/error/AppError';
import ICustomerRepository from '../repositories/ICustomerRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider,

    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequestDTO): Promise<Customer> {
    const checkCustomerExist = await this.customerRepository.findByEmail(email);

    if (checkCustomerExist) {
      throw new AppError('Email already used');
    }

    const checkProviderExist = await this.providerRepository.findByEmail(email);

    if (checkProviderExist) {
      throw new AppError('Email already used in Provider');
    }

    const hashPassword = await this.hashPasswordProvider.generateHash(password);

    const customer = await this.customerRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return customer;
  }
}

export default CreateProviderService;
