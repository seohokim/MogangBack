import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';
import {
  CreateLectureInputDto,
  CreateLectureOutputDto,
} from './dto/create-lecture.dto';
import { Request, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GetLectureInputDto, GetLectureOutputDto } from './dto/get-lecture.dto';
import {
  GetLectureListInputDto,
  GetLectureListOutputDto,
} from './dto/get-lecture-list.dto';
import {
  CreateLikeLectureInputDto,
  CreateLikeLectureOutputDto,
} from './dto/like-lecture.dto';

@Resolver((of) => Lecture)
export class LectureResolver {
  constructor(private lectureService: LectureService) {}

  @Mutation(() => CreateLectureOutputDto)
  async createLecture(
    @Args('createLectureInput') createLectureInput: CreateLectureInputDto,
  ): Promise<CreateLectureOutputDto> {
    return await this.lectureService.createLecture(createLectureInput);
  }

  @Query(() => GetLectureOutputDto)
  async getLecture(
    @Args('getLectureInput') getLectureInput: GetLectureInputDto,
  ): Promise<GetLectureOutputDto> {
    return await this.lectureService.getLecture(getLectureInput);
  }

  @Query(() => GetLectureListOutputDto)
  async getLectureList(
    @Args('getLectureListInput') getLectureListInput: GetLectureListInputDto,
  ): Promise<GetLectureListOutputDto> {
    return await this.lectureService.getLectureList(getLectureListInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreateLikeLectureOutputDto)
  async likeLecture(
    @Args('CreateLikeLectureInput')
    createLikeLectureInput: CreateLikeLectureInputDto,
    @Context('req') req,
  ): Promise<CreateLikeLectureOutputDto> {
    return await this.lectureService.likeLecture(
      createLikeLectureInput,
      req.user,
    );
  }
}
