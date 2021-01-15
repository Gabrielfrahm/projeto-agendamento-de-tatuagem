import CreateProviderService from '@modules/providers/services/CreateProviderService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ProviderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone } = request.body;

    const createProvider = container.resolve(CreateProviderService);

    const provider = await createProvider.execute({
      name,
      email,
      password,
      phone,
    });

    return response.json(provider);
  }
}
