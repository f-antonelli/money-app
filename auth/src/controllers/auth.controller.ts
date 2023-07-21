import { NextFunction, Request, Response } from 'express';
import { POST, before, route } from 'awilix-express';
import { createUserSchema } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import validateRequest from '../middleware/validate-request';
import { BadRequestError } from '../utils/bad-request-error';

@route('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @POST()
  @before(validateRequest(createUserSchema))
  public async signupHandler(
    req: Request<{}, {}, createUserSchema['body']>,
    res: Response,
    next: NextFunction
  ) {
    const { username, email, password } = req.body;
    
    try {
      const duplicate = await this.authService.findByEmail(email);
      if (duplicate) throw new BadRequestError('Email in use');

      const result = await this.authService.create({
        username,
        email,
        password,
      });

      if (result) res.status(201).send(result);

      res.status(404);
    } catch (err) {
      next(err);
    }
  }

  // public async signinHandler(req: Request, res: Response, next: NextFunction) {}
}
