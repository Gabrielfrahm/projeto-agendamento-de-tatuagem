interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendEmail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
}
