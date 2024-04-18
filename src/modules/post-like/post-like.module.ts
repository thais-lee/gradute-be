import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLike } from 'src/entities/post-like.entity';
import { Post } from 'src/entities/post.entity';

import { PostLikeController } from './post-like.controller';
import { PostLikeService } from './post-like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostLike, Post]),
    forwardRef(() => PostLikeModule),
  ],
  controllers: [PostLikeController],
  providers: [PostLikeService],
  exports: [PostLikeService],
})
export class PostLikeModule {}
