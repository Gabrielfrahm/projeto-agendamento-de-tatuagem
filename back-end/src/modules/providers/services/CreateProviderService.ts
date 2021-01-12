import { inject, injectable } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';
import IHashPasswordProvider from '../providers/HashPasswordProvider/models/IHashPasswordProvider';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequestDTO): Promise<Provider> {
    const checkProviderExist = await this.providerRepository.findByEmail(email);

    if (checkProviderExist) {
      throw new Error('Email already used');
    }

    const hashPassword = await this.hashPasswordProvider.generateHash(password);

    const provider = await this.providerRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return provider;
  }
}

export default CreateProviderService;
