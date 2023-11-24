import { Field, Float, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Lecture } from '../entities/lecture.entity';
import { CoreOutPut } from '../../common/dto/core.dto';

@InputType()
export class CreateLectureInputDto {
  @Field(() => String)
  title: string;

  @Field(() => String)
  author: string;

  @Field(() => [String])
  skills: string[];

  @Field(() => [String])
  category: string[];

  @Field(() => String)
  lectureUpdatedAt: string;

  @Field(() => String)
  level: string;

  @Field(() => Number)
  originPrice: number;

  @Field(() => Number)
  currentPrice: number;

  @Field(() => String)
  description: string;

  @Field(() => String)
  provider: string;

  @Field(() => String)
  thumbnailUrl: string;

  @Field(() => String)
  duration: string;

  @Field(() => Float) // 점수는 선택적일 수 있음
  score: number;

  @Field(() => String)
  url: string;
}

@ObjectType()
export class CreateLectureOutputDto extends CoreOutPut {
  @Field(() => Lecture, { nullable: true })
  lecture?: Lecture;
}
