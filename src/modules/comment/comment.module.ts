import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => CommentModule),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
