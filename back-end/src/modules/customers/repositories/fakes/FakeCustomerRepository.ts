import { v4 as uuid } from 'uuid';
import ICreateCustomerDTO from '@modules/providers/dtos/ICreateProviderDTO';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICustomerRepository from '../ICustomerRepository';

class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[];

  public async findById(id: string): Promise<Customer | undefined> {
    // procura o id do provider que for igual ao informado
    const customer = this.customers.find(customers => customers.id === id);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    // procura o  email do provider que for igual ao informado
    const customer = this.customers.find(
      customers => customers.email === email,
    );

    return customer;
  }

  public async create(customerData: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();
    // gera um id para a variavel
    Object.assign(customer, { id: uuid() }, customerData);

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );
    this.customers[findIndex] = customer;

    return customer;
  }
}

export default FakeCustomerRepository;
