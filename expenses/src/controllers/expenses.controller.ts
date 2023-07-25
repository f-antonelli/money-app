import { NextFunction, Request, Response } from 'express';
import { route, POST, before, GET } from 'awilix-express';
import { ExpensesService } from '../services/expenses.service';
import { NotFoundError, requireAuth, validateRequest } from '@money-app/common';
import { createExpenseSchema } from '../schemas/expenses.schema';

@route('/api/v1/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @POST()
  @before([requireAuth, validateRequest(createExpenseSchema)])
  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      await this.expensesService.store({
        ...req.body,
        userid: req.currentUser!.id,
      });

      res.status(201).send({ message: 'Expense created' });
    } catch (err) {
      next(err);
    }
  }

  @GET()
  @before(requireAuth)
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.expensesService.all(req.currentUser!.id);

      res.send(result);
    } catch (err) {
      next(err);
    }
  }

  @route('/:id')
  @GET()
  @before(requireAuth)
  public async getById(req: Request, res: Response, next: NextFunction) {
    const expense_id = req.params.id;

    try {
      const result = await this.expensesService.find({
        expense_id,
        userid: req.currentUser!.id,
      });
      if (!result) throw new NotFoundError();

      res.send(result);
    } catch (err) {
      next(err);
    }
  }
}
