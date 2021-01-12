import ICreateCustomerDTO from '@modules/providers/dtos/ICreateProviderDTO';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { getRepository, Repository } from 'typeorm';
import ICustomerRepository from '../../../repositories/ICustomerRepository';

class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    // procura o id do provider que for igual ao informado
    const customer = this.ormRepository.findOne(id);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    // procura o  email do provider que for igual ao informado
    const customer = this.ormRepository.findOne({ where: { email } });

    return customer;
  }

  public async create(customerData: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create(customerData);

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }
}

export default CustomerRepository;
