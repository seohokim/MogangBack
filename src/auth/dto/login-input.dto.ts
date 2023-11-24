import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutPut } from '../../common/dto/core.dto';

@InputType()
export class LoginInputDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class LoginOutputDto extends CoreOutPut {
  @Field(() => String, { nullable: true })
  accessToken?: string;
}
