import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';

interface IRequestDTO {
  provider_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
  ) {}

  public async execute({ provider_id }: IRequestDTO): Promise<Provider[]> {
    const providers = await this.providerRepository.findAllProviders({
      except_user_id: provider_id,
    });

    return providers;
  }
}

export default ListProviderService;
