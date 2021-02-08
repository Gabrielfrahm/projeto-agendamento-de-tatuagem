import IUserTokenRepository from '@modules/userToken/repositories/IUserTokenRepository';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import AppError from '@shared/error/AppError';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import ICustomerRepository from '../repositories/ICustomerRepository';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider,
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError(`user token not found`);
    }

    const user = await this.customerRepository.findById(userToken.customer_id);

    if (!user) {
      throw new AppError(`user does not existing`);
    }

    const tokenCredAt = userToken.created_at;

    const compareDate = addHours(tokenCredAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashPasswordProvider.generateHash(password);

    await this.customerRepository.save(user);
  }
}
export default ResetPasswordService;
