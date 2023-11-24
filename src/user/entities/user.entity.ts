import * as bcrypt from 'bcrypt';
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Core } from '../../common/entity/core.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Lecture } from '../../lecture/entities/lecture.entity';

@Entity()
@ObjectType()
export class User extends Core {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  photo?: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  @IsString()
  password: string;

  @ManyToMany(() => Lecture, (lecture) => lecture.likedByUsers)
  likedLectures: Lecture[];

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const result = await bcrypt.compare(password, this.password);
    console.log(result);
    return result;
  }

  toJSON() {
    return classToPlain(this);
  }
}
