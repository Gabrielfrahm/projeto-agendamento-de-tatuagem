import ResetPasswordService from '@modules/customers/services/ResetPasswordService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
