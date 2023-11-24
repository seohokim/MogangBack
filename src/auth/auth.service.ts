import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginInputDto, LoginOutputDto } from './dto/login-input.dto';
import {
  generateOkResponse,
  handleErrorResponse,
} from '../common/utils/response.util';
import { User } from '../user/entities/user.entity';
import { PasswordNotMatchError } from '../common/error/error.class';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInputDto): Promise<LoginOutputDto> {
    try {
      const user = await this.usersService.findUserByEmail(loginInput.email);
      const validateUser = await this.validateUser(user, loginInput.password);
      const payload = { userEmail: validateUser.email, sub: validateUser.id };
      return generateOkResponse<LoginOutputDto>({
        accessToken: this.jwtService.sign(payload),
      });
    } catch (error) {
      return handleErrorResponse<LoginOutputDto>(error, 'AuthService.login');
    }
  }

  async validateUser(user: User, password: string): Promise<User> {
    if (await user.validatePassword(password)) {
      return user;
    }
    throw new PasswordNotMatchError('Password Not Match');
  }
}
