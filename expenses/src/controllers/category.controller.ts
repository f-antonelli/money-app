import { NextFunction, Request, Response } from 'express';
import { route, POST, GET } from 'awilix-express';
import { CategoryService } from '../services/category.service';

@route('/api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GET()
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.categoryService.all();

      res.send(result);
    } catch (err) {
      next(err);
    }
  }

  @POST()
  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      await this.categoryService.store();

      res.status(201).send({ message: 'Categories created' });
    } catch (err) {
      next(err);
    }
  }
}
