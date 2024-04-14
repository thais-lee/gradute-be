import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseCommon } from 'src/common/common-swagger-response.dto';

import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentLikeService } from './comment-like.service';
import {
  CreateCommentLikeDto,
  UpdateCommentLikeDto,
} from './dto/comment-like.dto';

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

  @UseGuards(AuthGuard)
  @Put('/update')
  @ApiOperation({ summary: 'update a comment' })
  @ApiOkResponseCommon(Boolean)
  update(
    @Request() req,
    @Body(new ValidationPipe()) updateCommentLikeDto: UpdateCommentLikeDto,
  ) {
    const userInfo = req.user;
    return this.commentLikeService.update(updateCommentLikeDto, userInfo.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  @ApiOperation({ summary: 'unlike a comment' })
  @ApiOkResponseCommon(Boolean)
  delete(@Request() req, @Param('commentId') commentId: number) {
    const userInfo = req.user;
    return this.commentLikeService.delete(commentId, userInfo.id);
  }
}
