import { getRepository, Repository } from 'typeorm';

import IUserTokenRepository from '@modules/userToken/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokenRepository {
  // uma variável que vai receber o repositório
  private ormRepository: Repository<UserToken>;

  constructor() {
    // o repositório e criado aqui
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generateProviderToken(provider_id: string): Promise<UserToken> {
    const userProvider = this.ormRepository.create({
      provider_id,
    });

    await this.ormRepository.save(userProvider);

    return userProvider;
  }

  public async generateCustomerToken(customer_id: string): Promise<UserToken> {
    const userCustomer = this.ormRepository.create({
      customer_id,
    });

    await this.ormRepository.save(userCustomer);

    return userCustomer;
  }
}

export default UserTokensRepository;
