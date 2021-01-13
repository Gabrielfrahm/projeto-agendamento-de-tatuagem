import authConfig from '@config/auth';

import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/error/AppError';
import IHashPasswordProvider from '@shared/container/providers/HashPasswordProvider/models/IHashPasswordProvider';
import IProviderRepository from '../repositories/IProviderRepository';
import Provider from '../infra/typeorm/entities/Provider';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: Provider;
  token: string;
}

@injectable()
class AuthenticateCreateService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,

    @inject('HashPasswordProvider')
    private hashPasswordProvider: IHashPasswordProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const provider = await this.providerRepository.findByEmail(email);

    if (!provider) {
      throw new AppError('Incorrect email/password combination');
    }

    const passwordMatched = await this.hashPasswordProvider.compareHash(
      password,
      provider.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: provider.id,
      expiresIn,
    });

    return {
      user: provider,
      token,
    };
  }
}

export default AuthenticateCreateService;
