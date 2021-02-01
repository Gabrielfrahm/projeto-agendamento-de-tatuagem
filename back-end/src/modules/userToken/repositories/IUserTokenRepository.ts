import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generateProviderToken(provider_id: string): Promise<UserToken>;
  generateCustomerToken(customer_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
