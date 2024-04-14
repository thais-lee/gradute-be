import {
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CommentLike } from 'src/entities/comment-like.entity';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

import {
  CreateCommentLikeDto,
  GetAllCommentLikeParamsDto,
  UpdateCommentLikeDto,
} from './dto/comment-like.dto';

@Injectable()
export class CommentLikeService {
  constructor(
    @InjectRepository(CommentLike)
    private readonly commentLikeRepository: Repository<CommentLike>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAll(
    getAllCommentDto: GetAllCommentLikeParamsDto,
    options: IPaginationOptions,
  ): Promise<Pagination<CommentLike>> {
    const qb = this.commentLikeRepository
      .createQueryBuilder('commentLikes')
      .leftJoinAndSelect('commentLikes.user', 'user')
      .select([
        'commentLikes.id',
        'commentLikes.content',
        'commentLikes.commentId',
        'commentLikes.userId',
        'commentLikes.createdById',
        'user.id',
        'user.username',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.avatar',
      ])
      .where('commentLikes.commentId = :commentId', {
        commentId: getAllCommentDto.commentId,
      });

    qb.orderBy('commentLikes.createdAt', 'DESC');

    return paginate<CommentLike>(qb, options);
  }

  async create(commentLikeDto: CreateCommentLikeDto, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentLikeDto.commentId },
    });

    if (!comment) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'Comment not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const commentLike = await this.commentLikeRepository.findOne({
      where: { commentId: commentLikeDto.commentId, userId: userId },
    });

    if (commentLike) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'You have already liked this comment',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    commentLikeDto.userId = userId;
    commentLikeDto.createdById = userId;

    const result = await this.commentLikeRepository.save(commentLikeDto);
    return !!result;
  }

  async update(updateCommentLikeDto: UpdateCommentLikeDto, userId: number) {
    const commentLike = await this.commentLikeRepository.findOne({
      where: { commentId: updateCommentLikeDto.commentId, userId: userId },
    });

    if (!commentLike) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'You have not liked this comment yet',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    commentLike.content = updateCommentLikeDto.content;

    const result = await this.commentLikeRepository.save(commentLike);
    return !!result;
  }

  async delete(commentId: number, userId: number) {
    const commentLike = await this.commentLikeRepository.findOne({
      where: { commentId: commentId, userId: userId },
    });

    if (!commentLike) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'You have not liked this comment yet',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.commentLikeRepository.delete(commentLike.id);
    return !!result;
  }
}
