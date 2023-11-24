import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Core } from '../../common/entity/core.entity';
import { User } from '../../user/entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Lecture extends Core {
  @Column()
  @Field(() => String)
  @IsString()
  provider: string;

  @Column()
  @Field(() => String)
  @IsString()
  title: string;

  @Column({ nullable: true })
  @Field(() => String)
  @IsOptional()
  @IsString()
  author?: string;

  @Column('simple-array')
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @Column('simple-array')
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  category: string[];

  @Column({ default: '2023/11' })
  @Field(() => String)
  @Matches(/^\d{4}\/\d{2}$/) // 2023/11
  lectureUpdatedAt: string;

  @Column()
  @Field(() => String)
  @IsString()
  level: string;

  @Column()
  @Field(() => Number)
  @IsNumber()
  originPrice: number;

  @Column()
  @Field(() => Number)
  @IsNumber()
  currentPrice: number;

  @Column({ nullable: true })
  @Field(() => String)
  @Matches(/^(\d{1,4}):(\d{2})$/) //15:05 or 0:55
  duration: string;

  @Column('double precision')
  @Field(() => Number)
  @IsNumber()
  score: number;

  @Column({ default: 0 })
  @Field(() => Number)
  @IsNumber()
  views: number;

  @Column()
  @Field(() => String)
  @IsString()
  description: string;

  @ManyToMany(() => User, (user) => user.likedLectures, { cascade: true })
  @JoinTable()
  likedByUsers: User[];

  @Column()
  @Field(() => String)
  @IsUrl()
  thumbnailUrl: string;

  @Column({ unique: true })
  @Field(() => String)
  @IsString()
  @IsUrl()
  url: string;

  @BeforeInsert()
  private likeAndViews() {
    this.views = 0;
  }
}
