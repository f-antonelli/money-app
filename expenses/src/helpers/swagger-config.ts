export const SwaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Money App',
      description: '',
      version: '1.0.1',
    },
  },
  apis: ['./src/controllers/*.ts', './src/schemas/*.ts'],
  
};
