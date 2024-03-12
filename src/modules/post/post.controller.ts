import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { GetAllPostDto, GetPostQuery } from './dto/get-all-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
@ApiSecurity('access-token')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create a post' })
  @ApiOkResponseCommon(Boolean)
  create(
    @Request() req,
    @Body(new ValidationPipe()) createPostDto: CreatePostDto,
  ) {
    const userInfo = req.user;
    return this.postService.create(createPostDto, userInfo);
  }

  @Get('/get-all')
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponsePaginated(GetAllPostDto)
  findAll(@Query() getAllPost: GetPostQuery) {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update post by id' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete post by id' })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
