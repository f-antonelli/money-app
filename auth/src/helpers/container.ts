import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { AuthPostgreSQLRepository } from '../repositories/impl/postgresql/auth.repository';
import { AuthService } from '../services/auth.service';

export default (app: Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    // REPOSITORIES
    authRepository: asClass(AuthPostgreSQLRepository).scoped(),

    // SERVICES
    authService: asClass(AuthService).scoped(),
  });

  app.use(scopePerRequest(container));
};
