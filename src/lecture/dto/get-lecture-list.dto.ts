import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Lecture } from '../entities/lecture.entity';
import { CoreOutPut } from '../../common/dto/core.dto';

@InputType()
export class GetLectureListInputDto {
  @Field((type) => String, { nullable: true })
  title?: string;

  @Field((type) => [String], { nullable: true })
  skills?: string[];

  @Field((type) => Int, { nullable: true })
  currentPrice?: number;

  @Field((type) => String, { nullable: true })
  category?: string;

  @Field((type) => String)
  order: 'score' | 'createdAt' | 'currentPrice';

  @Field((type) => Int)
  page: number;
}

@ObjectType()
export class GetLectureListOutputDto extends CoreOutPut {
  @Field((type) => [Lecture], { nullable: true })
  lectures?: Lecture[];

  @Field((type) => Int, { nullable: true })
  totalPage?: number;

  @Field((type) => Int, { nullable: true })
  currentPage?: number;
}
