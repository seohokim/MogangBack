import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  generateOkResponse,
  handleErrorResponse,
} from '../common/utils/response.util';
import {
  CreateLectureInputDto,
  CreateLectureOutputDto,
} from './dto/create-lecture.dto';
import { GetLectureInputDto, GetLectureOutputDto } from './dto/get-lecture.dto';
import {
  LectureAlreadyExistError,
  LectureNotFoundError,
} from '../common/error/error.class';
import {
  GetLectureListInputDto,
  GetLectureListOutputDto,
} from './dto/get-lecture-list.dto';
import {
  CreateLikeLectureInputDto,
  CreateLikeLectureOutputDto,
} from './dto/like-lecture.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
    @InjectRepository(User)
    private readonly userReposiroty: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async createLecture(
    createLectureInput: CreateLectureInputDto,
  ): Promise<CreateLectureOutputDto> {
    try {
      const lecture = await this.saveLecture(createLectureInput);
      return generateOkResponse<CreateLectureOutputDto>({ lecture });
    } catch (error) {
      return handleErrorResponse<CreateLectureOutputDto>(
        error,
        'LectureService.createLecture',
      );
    }
  }

  async saveLecture(
    createLectureInput: CreateLectureInputDto,
  ): Promise<Lecture> {
    const lectureExist = await this.lectureRepository.findOne({
      where: { url: createLectureInput.url },
    });
    if (lectureExist) {
      throw new LectureAlreadyExistError('Lecture Already Exist');
    }
    const lecture = new Lecture();
    lecture.title = createLectureInput.title;
    lecture.author = createLectureInput.author;
    lecture.skills = createLectureInput.skills;
    lecture.category = createLectureInput.category;
    lecture.lectureUpdatedAt = createLectureInput.lectureUpdatedAt;
    lecture.level = createLectureInput.level;
    lecture.originPrice = createLectureInput.originPrice;
    lecture.currentPrice = createLectureInput.currentPrice;
    lecture.description = createLectureInput.description;
    lecture.provider = createLectureInput.provider;
    lecture.thumbnailUrl = createLectureInput.thumbnailUrl;
    lecture.duration = createLectureInput.duration;
    lecture.score = createLectureInput.score;
    lecture.url = createLectureInput.url;
    return await this.lectureRepository.save(lecture);
  }

  async getLecture(
    getLectureInput: GetLectureInputDto,
  ): Promise<GetLectureOutputDto> {
    try {
      const lecture = await this.findLectureById(getLectureInput.lectureId);
      return generateOkResponse<GetLectureOutputDto>({ lecture });
    } catch (error) {
      return handleErrorResponse<GetLectureOutputDto>(
        error,
        'LectureService.getLecture',
      );
    }
  }

  async getLectureList(
    filter: GetLectureListInputDto,
  ): Promise<GetLectureListOutputDto> {
    try {
      const queryBuilder = this.lectureRepository
        .createQueryBuilder('lecture')
        .loadRelationCountAndMap('lecture.likes', 'lecture.likedByUsers');
      if (filter.category) {
        this.applyCategory(filter.category, queryBuilder);
      }
      if (filter.title) {
        this.applyTitle(filter.title, queryBuilder);
      }
      if (filter.skills) {
        this.applySkills(filter.skills, queryBuilder);
      }
      if (filter.currentPrice) {
        this.applyCurrentPrice(filter.currentPrice, queryBuilder);
      }

      this.applyOrder(filter.order, queryBuilder);

      this.applyPage(filter.page, queryBuilder);

      const [lectures, totalLectures] = await queryBuilder.getManyAndCount();
      if (lectures.length === 0)
        throw new LectureNotFoundError('Lecture Not Found');

      const totalPage = Math.ceil(totalLectures / 9);
      return generateOkResponse<GetLectureListOutputDto>({
        lectures,
        totalPage,
        currentPage: filter.page,
      });
    } catch (error) {
      return handleErrorResponse<GetLectureListOutputDto>(
        error,
        'LectureService.getLectureList',
      );
    }
  }

  private applyCategory(
    category: string,
    queryBuilder: SelectQueryBuilder<Lecture>,
  ) {
    queryBuilder.andWhere(
      `string_to_array(lecture.category, ',') && :category`,
      { category },
    );
  }

  private applyTitle(title: string, queryBuilder: SelectQueryBuilder<Lecture>) {
    const formattedTitle = title.replace(/\s+/g, ''); // 사용자 입력에서 공백 제거
    queryBuilder.andWhere(
      "regexp_replace(lecture.title, '\\s', '', 'g') LIKE :title",
      { title: `%${formattedTitle}%` },
    );
  }

  private applySkills(
    skills: string[],
    queryBuilder: SelectQueryBuilder<Lecture>,
  ) {
    queryBuilder.andWhere(`string_to_array(lecture.skills, ',') && :skills`, {
      skills,
    });
  }

  private applyCurrentPrice(
    currentPrice: number,
    queryBuilder: SelectQueryBuilder<Lecture>,
  ) {
    queryBuilder.andWhere('lecture.currentPrice <= :currentPrice', {
      currentPrice,
    });
  }

  private applyOrder(order: string, queryBuilder: SelectQueryBuilder<Lecture>) {
    switch (order) {
      case 'score':
        queryBuilder.orderBy('lecture.score', 'DESC');
        break;
      case 'createdAt':
        queryBuilder.orderBy('lecture.createdAt', 'DESC');
        break;
      case 'currentPrice':
        queryBuilder.orderBy('lecture.currentPrice', 'ASC');
        break;
      default:
        queryBuilder.orderBy('lecture.score', 'DESC');
        break;
    }
  }

  private applyPage(page: number, queryBuilder: SelectQueryBuilder<Lecture>) {
    const limit = 9;
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);
  }
  async findLectureById(id: number): Promise<Lecture> {
    const lecture = await this.lectureRepository.findOne({
      where: { id },
      relations: ['likedByUsers'],
    });
    if (!lecture) {
      throw new LectureNotFoundError('Lecture Not Found');
    }
    return lecture;
  }

  async likeLecture(
    createLikeLectureInput: CreateLikeLectureInputDto,
    reqBody: any,
  ): Promise<CreateLikeLectureOutputDto> {
    try {
      const lecture = await this.findLectureById(
        createLikeLectureInput.lectureId,
      );
      const user = await this.userService.findUserByEmail(reqBody.email);
      const likeStatus = await this.processLikeLecture(lecture, user);
      return generateOkResponse<CreateLikeLectureOutputDto>({ likeStatus });
    } catch (error) {
      return handleErrorResponse<CreateLikeLectureOutputDto>(
        error,
        'LectureService.likeLecture',
      );
    }
  }

  async processLikeLecture(lecture: Lecture, user: User): Promise<String> {
    let result = 'fail';
    console.log(user);
    console.log(lecture);
    const alreadyLiked = user.likedLectures.some(
      (likedLecture) => likedLecture.id === lecture.id,
    );
    if (alreadyLiked) {
      user.likedLectures = user.likedLectures.filter(
        (likedLecture) => likedLecture.id !== lecture.id,
      );
      lecture.likedByUsers = lecture.likedByUsers.filter(
        (likedUser) => likedUser.id !== user.id,
      );
      result = 'unlike';
    } else {
      user.likedLectures.push(lecture);
      lecture.likedByUsers.push(user);
      result = 'like';
    }
    await this.userReposiroty.save(user);
    await this.lectureRepository.save(lecture);

    return result;
  }
}
