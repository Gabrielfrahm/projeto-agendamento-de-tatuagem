import { inject, injectable } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequestDTO {
  provider_id: string;
  name: string;
  email: string;
  old_password?: string;
  password: string;
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
  }: IRequestDTO): Promise<Provider> {}
}

export default UpdateProfileService;
