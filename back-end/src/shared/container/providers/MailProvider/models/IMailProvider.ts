import ISendEmailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>;
}
