import ICreateProviderDTO from '@modules/providers/dtos/ICreateProviderDTO';
import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import { getRepository, Repository } from 'typeorm';
import Provider from '../entities/Provider';

class ProviderRepository implements IProviderRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = this.ormRepository.findOne(id);

    return provider;
  }

  public async findByEmail(email: string): Promise<Provider | undefined> {
    const provider = this.ormRepository.findOne({ where: { email } });

    return provider;
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    // cria o usuário
    const provider = this.ormRepository.create(providerData);

    await this.ormRepository.save(provider);

    return provider;
  }

  public async save(provider: Provider): Promise<Provider> {
    return this.ormRepository.save(provider);
  }
}

export default ProviderRepository;
