import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from 'src/entities/comment-like.entity';
import { Comment } from 'src/entities/comment.entity';

import { CommentLikeController } from './comment-like.controller';
import { CommentLikeService } from './comment-like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentLike, Comment]),
    forwardRef(() => CommentLikeModule),
  ],
  providers: [CommentLikeService],
  controllers: [CommentLikeController],
  exports: [CommentLikeService],
})
export class CommentLikeModule {}
