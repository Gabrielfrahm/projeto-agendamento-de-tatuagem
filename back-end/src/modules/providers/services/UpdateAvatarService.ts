import IStorageProvider from '@shared/container/providers/StoregeProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import AppError from '@shared/error/AppError';
import IProviderRepository from '../repositories/IProviderRepository';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFileName,
  }: IRequestDTO): Promise<Provider> {
    const provider = await this.providerRepository.findById(user_id);

    if (!provider) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (provider.avatar) {
      await this.storageProvider.deleteFile(provider.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    provider.avatar = fileName;

    await this.providerRepository.save(provider);

    return provider;
  }
}

export default UpdateAvatarService;
