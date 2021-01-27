import fs from 'fs';
import handlebars from 'handlebars';
import IParseMailTemplateDTO from '../dtos/IParseTemplateMailDTO';
import ITemplateMailProvider from '../models/ITemplateMailProvider';

export default class HandlebarsMailTemplateProvider
  implements ITemplateMailProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
