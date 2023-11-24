import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Lecture } from '../entities/lecture.entity';
import { CoreOutPut } from '../../common/dto/core.dto';

@InputType()
export class GetLectureInputDto {
  @Field(() => Number)
  lectureId: number;
}

@ObjectType()
export class GetLectureOutputDto extends CoreOutPut {
  @Field(() => Lecture, { nullable: true })
  lecture?: Lecture;
}
