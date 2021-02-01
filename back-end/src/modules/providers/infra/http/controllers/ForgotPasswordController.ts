import SendForgotPasswordEmailService from '@modules/providers/services/SendForgotPasswordService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
