import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { PostLike } from 'src/entities/post-like.entity';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

import {
  CreatePostLikeDto,
  GetAllPostLikeParamsDto,
  UpdatePostLikeDto,
} from './dto/post-like.dto';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAll(
    getAllPostDto: GetAllPostLikeParamsDto,
    options: IPaginationOptions,
  ): Promise<Pagination<PostLike>> {
    const qb = this.postLikeRepository
      .createQueryBuilder('postLikes')
      .leftJoinAndSelect('postLikes.user', 'user')
      .select([
        'postLikes.id',
        'postLikes.content',
        'postLikes.postId',
        'postLikes.userId',
        'postLikes.createdById',
        'user.id',
        'user.username',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.avatar',
      ])
      .where('postLikes.postId = :postId', {
        postId: getAllPostDto.postId,
      });

    qb.orderBy('postLikes.createdAt', 'DESC');

    return paginate<PostLike>(qb, options);
  }

  async create(postLikeDto: CreatePostLikeDto, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postLikeDto.postId },
    });

    if (!post) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'Post not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const postLike = await this.postLikeRepository.findOne({
      where: { postId: postLikeDto.postId, userId: userId },
    });

    if (postLike) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'You have already liked this post',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    postLikeDto.userId = userId;
    postLikeDto.createdById = userId;

    const result = await this.postLikeRepository.save(postLikeDto);
    return !!result;
  }

  async update(updatePostLikeDto: UpdatePostLikeDto, userId: number) {
    const postLike = await this.postLikeRepository.findOne({
      where: { postId: updatePostLikeDto.postId, userId: userId },
    });

    if (!postLike) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'You have not liked this post yet',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    postLike.content = updatePostLikeDto.content;

    const result = await this.postLikeRepository.save(postLike);
    return !!result;
  }

  async delete(postId: number, userId: number) {
    const postLike = await this.postLikeRepository.findOne({
      where: { postId: postId, userId: userId },
    });

    if (!postLike) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'You have not liked this post yet',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.postLikeRepository.delete(postLike.id);
    return !!result;
  }
}
