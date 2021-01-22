import ListProviderService from '@modules/appointments/services/ListProviderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    // usando injeção de dependências
    const listProvidersService = container.resolve(ListProviderService);

    const providers = await listProvidersService.execute({
      provider_id: user_id,
    });

    return response.json(providers);
  }
}
