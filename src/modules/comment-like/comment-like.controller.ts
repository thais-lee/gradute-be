import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponseCommon,
  ApiOkResponsePaginated,
} from 'src/common/common-swagger-response.dto';
import { Pagination, PaginationParams } from 'src/decorators/pagination-param';

import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentLikeService } from './comment-like.service';
import {
  CreateCommentLikeDto,
  GetAllCommentLikeDto,
  GetAllCommentLikeParamsDto,
  UpdateCommentLikeDto,
} from './dto/comment-like.dto';

@Controller('commentLikes')
@ApiSecurity('access-token')
@ApiTags('comment-likes')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @Get('/get-all')
  @ApiOperation({ summary: 'Get all comment-likes' })
  @ApiOkResponsePaginated(GetAllCommentLikeDto)
  findAll(
    @Query() getAllCommentDto: GetAllCommentLikeParamsDto,
    @PaginationParams() paginateOptions: Pagination,
  ) {
    return this.commentLikeService.getAll(getAllCommentDto, paginateOptions);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Like a comment' })
  @ApiOkResponseCommon(Boolean)
  create(
    @Request() req,
    @Body(new ValidationPipe()) createCommentLikeDto: CreateCommentLikeDto,
  ) {
    const userInfo = req.user;
    return this.commentLikeService.create(createCommentLikeDto, userInfo.id);
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
