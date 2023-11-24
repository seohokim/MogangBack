import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInputDto, CreateUserOutputDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from './entities/user.entity';
import { GetLikedLectureOutputDto } from './dto/get-liked-lecture.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  async getUserInfo(@Context('req') req): Promise<String> {
    console.log(req.user);
    return req;
  }

  @Mutation(() => CreateUserOutputDto)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    return await this.userService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => GetLikedLectureOutputDto)
  async getLikedLecture(
    @Context('req') req,
  ): Promise<GetLikedLectureOutputDto> {
    return await this.userService.getLikedLecture(req.user.id);
  }
}
