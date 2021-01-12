import ICreateProviderDTO from '../dtos/ICreateCustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomerRepository {
  findById(id: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  create(data: ICreateProviderDTO): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
}
