import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/error/AppError';
import authConfig from '@config/auth';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import ICustomerRepository from '../repositories/ICustomerRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: Customer;
  token: string;
}

@injectable()
class AuthenticateCreateService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Incorrect email/password combination');
    }

    const passwordMatched = await this.hashPasswordProvider.compareHash(
      password,
      customer.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: customer.id,
      expiresIn,
    });

    return {
      user: customer,
      token,
    };
  }
}

export default AuthenticateCreateService;
