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
import {
  CreatePostLikeDto,
  GetAllPostLikeParamsDto,
  UpdatePostLikeDto,
} from './dto/post-like.dto';
import { PostLikeService } from './post-like.service';

@Controller('postLikes')
@ApiSecurity('access-token')
@ApiTags('post-likes')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Get('/get-all')
  @ApiOperation({ summary: 'Get all post-likes' })
  @ApiOkResponsePaginated(GetAllPostLikeParamsDto)
  findAll(
    @Query() getAllPostDto: GetAllPostLikeParamsDto,
    @PaginationParams() paginateOptions: Pagination,
  ) {
    return this.postLikeService.getAll(getAllPostDto, paginateOptions);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Like a post' })
  @ApiOkResponseCommon(Boolean)
  create(
    @Request() req,
    @Body(new ValidationPipe()) createPostLikeDto: CreatePostLikeDto,
  ) {
    const userInfo = req.user;
    return this.postLikeService.create(createPostLikeDto, userInfo.id);
  }

  @UseGuards(AuthGuard)
  @Put('/update')
  @ApiOperation({ summary: 'update a post' })
  @ApiOkResponseCommon(Boolean)
  update(
    @Request() req,
    @Body(new ValidationPipe()) updatePostLikeDto: UpdatePostLikeDto,
  ) {
    const userInfo = req.user;
    return this.postLikeService.update(updatePostLikeDto, userInfo.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  @ApiOperation({ summary: 'unlike a post' })
  @ApiOkResponseCommon(Boolean)
  delete(@Request() req, @Param('postId') postId: number) {
    const userInfo = req.user;
    return this.postLikeService.delete(postId, userInfo.id);
  }
}
