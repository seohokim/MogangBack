import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutPut } from '../../common/dto/core.dto';

@InputType()
export class CreateLikeLectureInputDto {
  @Field(() => Number)
  lectureId: number;
}

@ObjectType()
export class CreateLikeLectureOutputDto extends CoreOutPut {
  @Field(() => String, { nullable: true })
  likeStatus?: String;
}
