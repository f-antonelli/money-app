import { NextFunction, Request, Response } from 'express';
import { route, POST, before } from 'awilix-express';
import { ExpensesService } from '../services/expenses.service';
import { validateRequest } from '@money-app/common';
import { createExpenseSchema } from '../schemas/expenses.schema';

@route('/api/v1/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @POST()
  @before(validateRequest(createExpenseSchema))
  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      await this.expensesService.store(req.body);

      res.status(201).send({ message: 'Expense created' });
    } catch (err) {
      next(err);
    }
  }
}
