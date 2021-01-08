import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import { inject, injectable } from 'tsyringe';
import IProviderRepository from '../repositories/IProviderRepository';

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

    const provider = await this.providerRepository.create({
      name,
      email,
      password,
    });

    return provider;
  }
}

export default CreateProviderService;
