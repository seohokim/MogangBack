import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Lecture } from '../../lecture/entities/lecture.entity';
import { CoreOutPut } from '../../common/dto/core.dto';

@ObjectType()
export class GetLikedLectureOutputDto extends CoreOutPut {
  @Field(() => [Lecture], { nullable: true })
  likedLectures?: Lecture[];
}
