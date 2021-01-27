import IParseMailTemplateDTO from '../dtos/IParseTemplateMailDTO';

export default interface ITemplateMailProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
