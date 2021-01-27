interface IMailConfig {
  driver: 'ethereal' | 'zoho';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: 'ethereal' || 'zoho',

  defaults: {
    from: {
      email: 'gbls.dev@zohomail.com',
      name: 'Equipe Tattoo',
    },
  },
} as IMailConfig;
