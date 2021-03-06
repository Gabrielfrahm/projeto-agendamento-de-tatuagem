import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class CustomerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
      password,
      phone,
    });

    return response.json(customer);
  }
}
