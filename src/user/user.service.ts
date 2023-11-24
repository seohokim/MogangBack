import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInputDto, CreateUserOutputDto } from './dto/create-user.dto';
import {
  generateOkResponse,
  handleErrorResponse,
} from '../common/utils/response.util';
import {
  CheckedPasswordNotMatchError,
  UserAlreadyExistError,
  UserNotFoundError,
} from '../common/error/error.class';
import { GetLikedLectureOutputDto } from './dto/get-liked-lecture.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createUserInput: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    try {
      const user = await this.saveUser(createUserInput);
      return generateOkResponse<CreateUserOutputDto>({ user });
    } catch (error) {
      return handleErrorResponse<CreateUserOutputDto>(
        error,
        'UserService.create',
      );
    }
  }

  async saveUser(createUserInput: CreateUserInputDto): Promise<User> {
    const { email, password, checkPassword } = createUserInput;
    const existUser = await this.userRepository.findOne({ where: { email } });
    if (existUser) throw new UserAlreadyExistError('User Already Exist');
    if (password !== checkPassword)
      throw new CheckedPasswordNotMatchError('Password Not Match');
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = createUserInput.firstName;
    user.lastName = createUserInput.lastName;
    return await this.userRepository.save(user);
  }

  async getLikedLecture(userId: number): Promise<GetLikedLectureOutputDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['likedLectures'],
      });
      return generateOkResponse<GetLikedLectureOutputDto>({
        likedLectures: user.likedLectures,
      });
    } catch (error) {
      return handleErrorResponse<GetLikedLectureOutputDto>(
        error,
        'UserService.getLikedLecture',
      );
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['likedLectures'],
    });
    if (!user) {
      throw new UserNotFoundError('User Not Found');
    }
    return user;
  }
}
