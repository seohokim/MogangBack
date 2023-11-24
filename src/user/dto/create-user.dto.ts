import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutPut } from '../../common/dto/core.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInputDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  checkPassword: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

@ObjectType()
export class CreateUserOutputDto extends CoreOutPut {
  @Field(() => User, { nullable: true })
  user?: User;
}
