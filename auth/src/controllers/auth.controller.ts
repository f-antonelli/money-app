import { NextFunction, Request, Response } from 'express';
import { GET, POST, before, route } from 'awilix-express';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import validateRequest from '../middleware/validate-request';
import { BadRequestError } from '../utils/bad-request-error';
import { currentUser } from '../middleware/current-user';

@route('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @route('/signup')
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

      await this.authService.create({
        username,
        email,
        password,
      });

      res.status(201).send({ message: 'User created' });
    } catch (err) {
      next(err);
    }
  }

  @route('/signin')
  @POST()
  @before(validateRequest(loginUserSchema))
  public async signinHandler(
    req: Request<{}, {}, loginUserSchema['body']>,
    res: Response,
    next: NextFunction
  ) {
    const { email, password } = req.body;

    try {
      const result = await this.authService.signIn({ email, password });
      if (!result) throw new BadRequestError('Invalid credentials');

      req.session = { jwt: result.token };

      res.status(200).send(result.user);
    } catch (err) {
      next(err);
    }
  }

  @route('/signout')
  @POST()
  public async signoutHandler(req: Request, res: Response, next: NextFunction) {
    req.session = null;

    res.send({});
  }

  @route('/currentuser')
  @GET()
  @before(currentUser)
  public async currentUser(req: Request, res: Response, next: NextFunction) {
    res.send({ currentUser: req.currentUser || null });
  }
}
