import IHashPasswordProvider from '../models/IHashPasswordProvider';

class FakeHashPasswordProvider implements IHashPasswordProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashPasswordProvider;
