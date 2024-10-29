import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import type { SignInSchema, SignupSchema } from './auth.request';
import type { AuthService } from './auth.service';

export default class AuthController {
  private _service: AuthService;

  constructor(authService: AuthService) {
    this._service = authService;
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password, pixKey, telephone } =
        req.body as SignupSchema;

      const response = await this._service.signUp({
        email,
        name,
        password,
        pixKey,
        telephone,
      });

      return res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as SignInSchema;

      const response = await this._service.login({ email, password });

      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}
