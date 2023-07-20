import { NextFunction, Request, Response } from 'express';
import { createUserSchema } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import { POST, before, route } from 'awilix-express';
import validateRequest from '../middleware/validate-request';

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

    const result = await this.authService.create({
      username,
      email,
      password,
    });

    res.send(result);
    try {
    } catch (err) {}
  }

  public async signinHandler(req: Request, res: Response, next: NextFunction) {}
}
