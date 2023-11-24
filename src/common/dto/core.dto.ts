import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutPut {
  @Field(() => Boolean, { nullable: false })
  ok: boolean;

  @Field(() => [String], { nullable: 'itemsAndList' })
  message?: string[];
}
