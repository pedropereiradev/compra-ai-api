import { AppDataSource } from '@src/core/config/database/data-source';
import { BadRequestError } from '@src/core/errors/bad-request';
import { generateAccessToken } from '@src/core/utils/jwt';
import { hashPassword, validatePassword } from '@src/core/utils/password';
import type { Repository } from 'typeorm';
import User from '../user/user-model';
import type { SignInSchema, SignupSchema } from './auth.request';

export class AuthService {
  private _repository: Repository<User>;

  constructor() {
    this._repository = AppDataSource.getRepository(User);
  }

  async signUp(payload: SignupSchema): Promise<Partial<User>> {
    const findUser = await this._repository
      .findOne({
        where: [{ email: payload.email }, { telephone: payload.telephone }],
      })
      .catch(() => null);

    if (findUser) {
      throw new BadRequestError('User already exists');
    }

    const hashedPassword = hashPassword(payload.password);

    const user = this._repository.create({
      email: payload.email,
      name: payload.name,
      password: hashedPassword,
      telephone: payload.telephone,
      pixKey: payload.pixKey || null,
    });

    await this._repository.save(user);

    return {
      email: user.email,
      name: user.name,
      telephone: user.telephone,
      pixKey: user.pixKey,
    };
  }

  async login({ email, password }: SignInSchema) {
    const user = await this._repository
      .findOne({
        where: { email },
      })
      .catch(() => null);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const isPasswordValid = validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError('User not found');
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateAccessToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }
}
