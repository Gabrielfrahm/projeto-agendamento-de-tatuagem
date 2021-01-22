import ICreateProviderDTO from '../dtos/ICreateProviderDTO';
import IFindAllProviders from '../dtos/IFindAllProviders';
import Provider from '../infra/typeorm/entities/Provider';

export default interface IProviderRepository {
  findAllProviders(data: IFindAllProviders): Promise<Provider[]>;
  findById(id: string): Promise<Provider | undefined>;
  findByEmail(email: string): Promise<Provider | undefined>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(provider: Provider): Promise<Provider>;
}
