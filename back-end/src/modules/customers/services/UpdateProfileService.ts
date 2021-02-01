import { inject, injectable } from 'tsyringe';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import AppError from '@shared/error/AppError';
import IProviderRepository from '@modules/providers/repositories/IProviderRepository';

interface IRequestDTO {
  customer_id: string;
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
    customer_id,
    name,
    email,
    old_password,
    password,
    phone,
  }: IRequestDTO): Promise<Customer> {
    const customer = await this.customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }
    // acha o email caso ja tenha sendo usado em customer
    const ifProviderEmail = await this.providerRepository.findByEmail(email);

    if (ifProviderEmail) {
      throw new AppError('E-mail already user if Provider user');
    }

    // encontra o email
    const customerWithUpdateEmail = await this.customerRepository.findByEmail(
      customer.email,
    );

    // caso o email seja encontrado e ele for diferente do id da pessoa que pediu o reset da erro
    if (customerWithUpdateEmail && customerWithUpdateEmail.id !== customer_id) {
      throw new AppError('E-mail already used');
    }

    customer.email = email;
    customer.name = name;
    customer.phone = phone;

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
        customer.password,
      );

      if (!checkedPassword) {
        throw new AppError('Old password does not math');
      }
      customer.password = await this.hashPasswordProvider.generateHash(
        password,
      );
    }

    return this.customerRepository.save(customer);
  }
}

export default UpdateProfileService;
