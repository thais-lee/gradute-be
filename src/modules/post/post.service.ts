import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { ERole } from 'src/common/enums/role.enum';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userInfo: User) {
    createPostDto.createdById = userInfo.id;
    createPostDto.userId = userInfo.id;

    const result = await this.postRepository.save(createPostDto);
    return !!result;
  }

  async getAll(options: IPaginationOptions): Promise<Pagination<Post>> {
    const qb = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.imageUrls',
        'post.createdById',
        'post.createdAt',
        'post.userId',
        'user.id',
        'user.username',
        'user.firstName',
        'user.lastName',
        'user.email',
      ])
      .orderBy('post.createdAt', 'DESC');
    return paginate<Post>(qb, options);
  }

  async getOne(id: number) {
    const location = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .select('post');
    const result = await location.getOne();

    if (!result) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'Post not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userInfo: User) {
    const post = await this.getOne(id);

    if (post.userId !== userInfo.id && userInfo.role !== ERole.ADMIN) {
      throw new HttpException(
        {
          code: HttpStatus.FORBIDDEN,
          message: 'You are not allowed to access this resource',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.postRepository.update(post.id, updatePostDto);

    return !!result;
  }

  async delete(id: number, userInfo: User) {
    const post = await this.getOne(id);

    if (post.userId !== userInfo.id && userInfo.role !== ERole.ADMIN) {
      throw new HttpException(
        {
          code: HttpStatus.FORBIDDEN,
          message: 'You are not allowed to access this resource',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    await this.postRepository.update(post.id, { deletedById: userInfo.id });
    const result = await this.postRepository.softDelete(post.id);

    return !!result;
  }
}
