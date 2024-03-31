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
import { GetPaginatedDto } from 'src/common/get-paginated.dto';

import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

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

  //   @Get('/get-all')
  //   @ApiOperation({ summary: 'Get all posts' })
  //   @ApiOkResponsePaginated(GetAllPostDto)
  //   findAll(@Query() paginate: GetPaginatedDto) {
  //     return this.postService.getAll(paginate);
  //   }

  //   @Get(':id')
  //   @ApiOperation({ summary: 'Get post by id' })
  //   findOne(@Param('id') id: string) {
  //     return this.postService.getOne(+id);
  //   }

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
