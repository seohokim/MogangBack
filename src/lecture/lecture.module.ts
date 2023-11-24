import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureResolver } from './lecture.resolver';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Lecture])],
  providers: [LectureService, LectureResolver, UserService],
})
export class LectureModule {}
