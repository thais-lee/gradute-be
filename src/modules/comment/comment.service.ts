import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { ERole } from 'src/common/enums/role.enum';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { PostService } from 'src/modules/post/post.service';
import { Repository } from 'typeorm';

import {
  CreateCommentDto,
  GetAllCommentDto,
  UpdateCommentDto,
} from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto, userInfo: User) {
    const post = await this.postService.getOne(createCommentDto.postId);

    if (!post) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          message: 'Post not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    createCommentDto.createdById = userInfo.id;
    createCommentDto.userId = userInfo.id;

    const result = await this.commentRepository.save(createCommentDto);
    return !!result;
  }

  async getAll(
    getAllCommentDto: GetAllCommentDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Comment>> {
    const qb = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .select([
        'comment.id',
        'comment.content',
        'comment.imageUrl',
        'comment.createdById',
        'comment.createdAt',
        'user.id',
        'user.username',
        'user.firstName',
        'user.lastName',
        'user.email',
      ])
      .orderBy('comment.createdAt', 'DESC');
    return paginate<Comment>(qb, options);
  }

  //   async getOne(id: number) {
  //     const location = this.commentRepository
  //       .createQueryBuilder('post')
  //       .where('post.id = :id', { id })
  //       .select('post');
  //     const result = await location.getOne();

  //     if (!result) {
  //       throw new HttpException(
  //         {
  //           code: HttpStatus.NOT_FOUND,
  //           message: 'Post not found',
  //         },
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     return result;
  //   }

  async update(id: number, updatePostDto: UpdateCommentDto, userInfo: User) {
    const comment = await this.checkCommentExist(id);

    await this.checkPermission(userInfo, comment);

    const result = await this.commentRepository.update(comment.id, {
      updatedById: userInfo.id,
      ...updatePostDto,
    });

    return !!result;
  }

  async delete(id: number, userInfo: User) {
    const comment = await this.checkCommentExist(id);

    await this.checkPermission(userInfo, comment);

    const result = await this.commentRepository.delete(comment.id);

    return !!result;
  }

  private async checkCommentExist(id: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
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

    return comment;
  }

  private async checkPermission(userInfo: User, comment: Comment) {
    if (comment.userId !== userInfo.id && userInfo.role !== ERole.ADMIN) {
      throw new HttpException(
        {
          code: HttpStatus.FORBIDDEN,
          message: 'You are not allowed to access this resource',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
