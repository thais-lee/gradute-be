import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole } from 'src/common/enums/role.enum';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { PostService } from 'src/modules/post/post.service';
import { Repository } from 'typeorm';

import { CreateCommentDto } from './dto/comment.dto';

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

  //   async getAll(options: IPaginationOptions): Promise<Pagination<Post>> {
  //     const qb = this.commentRepository
  //       .createQueryBuilder('post')
  //       .leftJoinAndSelect('post.user', 'user')
  //       .select([
  //         'post.id',
  //         'post.title',
  //         'post.content',
  //         'post.imageUrls',
  //         'post.createdById',
  //         'post.createdAt',
  //         'post.userId',
  //         'user.id',
  //         'user.username',
  //         'user.firstName',
  //         'user.lastName',
  //         'user.email',
  //       ])
  //       .orderBy('post.createdAt', 'DESC');
  //     return paginate<Post>(qb, options);
  //   }

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

  //   async update(id: number, updatePostDto: UpdatePostDto, userInfo: User) {
  //     const post = await this.getOne(id);

  //     if (post.userId !== userInfo.id && userInfo.role !== ERole.ADMIN) {
  //       throw new HttpException(
  //         {
  //           code: HttpStatus.FORBIDDEN,
  //           message: 'You are not allowed to access this resource',
  //         },
  //         HttpStatus.FORBIDDEN,
  //       );
  //     }

  //     const result = await this.commentRepository.update(post.id, updatePostDto);

  //     return !!result;
  //   }

  async delete(id: number, userInfo: User) {
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

    if (comment.userId !== userInfo.id && userInfo.role !== ERole.ADMIN) {
      throw new HttpException(
        {
          code: HttpStatus.FORBIDDEN,
          message: 'You are not allowed to access this resource',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.commentRepository.delete(comment.id);

    return !!result;
  }
}
