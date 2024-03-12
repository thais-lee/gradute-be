import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/common-swagger-response.dto';

import { CreatePostDto } from './dto/create-post.dto';
import { GetAllPostDto, GetPostQuery } from './dto/get-all-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a post' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
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
