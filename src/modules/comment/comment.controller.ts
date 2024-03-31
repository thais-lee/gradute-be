import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  GetAllCommentDto,
  UpdateCommentDto,
} from './dto/comment.dto';

@Controller('comment')
@ApiSecurity('access-token')
@ApiTags('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create a comment' })
  @ApiOkResponseCommon(Boolean)
  create(
    @Request() req,
    @Body(new ValidationPipe()) createCommentDto: CreateCommentDto,
  ) {
    const userInfo = req.user;
    return this.commentService.create(createCommentDto, userInfo);
  }

  @Get('/get-all')
  @ApiOperation({ summary: 'Get all comments' })
  @ApiOkResponsePaginated(GetAllCommentDto)
  findAll(
    @Query() getAllCommentDto: GetAllCommentDto,
    @PaginationParams() paginateOptions: Pagination,
  ) {
    return this.commentService.getAll(getAllCommentDto, paginateOptions);
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  @ApiOperation({ summary: 'Update comment by id' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePostDto: UpdateCommentDto,
    @Request() req,
  ) {
    const userInfo = req.user;
    return this.commentService.update(+id, updatePostDto, userInfo);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete comment by id' })
  remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userInfo = req.user;
    return this.commentService.delete(+id, userInfo);
  }
}
