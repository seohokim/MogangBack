import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Core {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  @IsDate()
  updatedAt: Date;
}
