import { compare, hash } from 'bcryptjs';
import IHashPasswordProvider from '../models/IHashPasswordProvider';

export default class HashPasswordProvider implements IHashPasswordProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
