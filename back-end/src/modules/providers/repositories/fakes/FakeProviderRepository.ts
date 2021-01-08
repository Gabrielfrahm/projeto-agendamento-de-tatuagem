import { v4 as uuid } from 'uuid';
import ICreateProviderDTO from '@modules/providers/dtos/ICreateProviderDTO';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import IProviderRepository from '../IProviderRepository';

class FakeProviderRepository implements IProviderRepository {
  private providers: Provider[];

  public async findById(id: string): Promise<Provider | undefined> {
    // procura o id do provider que for igual ao informado
    const provider = this.providers.find(providers => providers.id === id);

    return provider;
  }

  public async findByEmail(email: string): Promise<Provider | undefined> {
    // procura o  email do provider que for igual ao informado
    const provider = this.providers.find(
      providers => providers.email === email,
    );

    return provider;
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = new Provider();
    // gera um id para a variavel
    Object.assign(provider, { id: uuid() }, providerData);

    this.providers.push(provider);

    return provider;
  }

  public async save(provider: Provider): Promise<Provider> {
    const findIndex = this.providers.findIndex(
      findProvider => findProvider.id === provider.id,
    );
    this.providers[findIndex] = provider;

    return provider;
  }
}

export default FakeProviderRepository;
