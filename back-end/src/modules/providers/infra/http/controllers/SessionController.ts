import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateCreateService from '@modules/providers/services/AuthenticateCreateService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateProvider = container.resolve(AuthenticateCreateService);

    const { user, token } = await authenticateProvider.execute({
      email,
      password,
    });

    // Com a atualização do TypeScript, isso se faz necessário
    // const userWithoutPassword = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   avatar: user.avatar,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    return response.json({
      userWithoutPassword: classToClass(user),
      token,
    });
  }
}
