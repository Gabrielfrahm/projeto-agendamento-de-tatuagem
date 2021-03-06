import UpdateProfileService from '@modules/providers/services/UpdateProfileService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ProfileService {
  public async update(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const { name, email, old_password, password, phone } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const provider = await updateProfile.execute({
      provider_id,
      name,
      email,
      old_password,
      password,
      phone,
    });

    return response.json(classToClass(provider));
  }
}
