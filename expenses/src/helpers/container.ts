import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { ExpensesPostgreSQLRepository } from '../repositories/impl/postgresql/expenses.repository';
import { CategoryPostgreSQLRepository } from '../repositories/impl/postgresql/category.repository';
import { ExpensesService } from '../services/expenses.service';
import { CategoryService } from '../services/category.service';

export default (app: Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    // REPOSITORIES
    expensesRepository: asClass(ExpensesPostgreSQLRepository).scoped(),
    categoryRepository: asClass(CategoryPostgreSQLRepository).scoped(),

    // SERVICES
    expensesService: asClass(ExpensesService).scoped(),
    categoryService: asClass(CategoryService).scoped(),
  });

  app.use(scopePerRequest(container));
};
