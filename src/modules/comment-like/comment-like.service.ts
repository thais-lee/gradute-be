import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentLike } from 'src/entities/comment-like.entity';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

import {
  CreateCommentLikeDto,
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

    commentLikeDto.userId = userId;

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
