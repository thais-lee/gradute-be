import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseCommon } from 'src/common/common-swagger-response.dto';

import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentLikeService } from './comment-like.service';
import { CreateCommentLikeDto } from './dto/comment-like.dto';

@Controller('commentLikes')
@ApiSecurity('access-token')
@ApiTags('comment-likes')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Like a comment' })
  @ApiOkResponseCommon(Boolean)
  create(
    @Request() req,
    @Body(new ValidationPipe()) createCommentLikeDto: CreateCommentLikeDto,
  ) {
    const userInfo = req.user;
    return this.commentLikeService.create(createCommentLikeDto, userInfo);
  }
}
