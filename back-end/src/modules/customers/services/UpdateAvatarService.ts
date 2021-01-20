import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StoregeProvider/models/IStorageProvider';
import AppError from '@shared/error/AppError';
import ICustomerRepository from '../repositories/ICustomerRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFileName,
  }: IRequestDTO): Promise<Customer> {
    const customer = await this.customerRepository.findById(user_id);

    if (!customer) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (customer.avatar) {
      await this.storageProvider.deleteFile(customer.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    customer.avatar = fileName;

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default UpdateAvatarService;
