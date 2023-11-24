import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto, LoginOutputDto } from './dto/login-input.dto';

@Resolver(() => LoginOutputDto)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => LoginOutputDto)
  async login(
    @Args('loginInput') loginInput: LoginInputDto,
  ): Promise<LoginOutputDto> {
    return this.authService.login(loginInput);
  }
}
