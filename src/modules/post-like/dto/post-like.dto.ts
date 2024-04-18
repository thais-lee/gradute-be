import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';
import { CreatedById } from 'src/entities/full-audited.entity';

export class GetAllPostLikeDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  content: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  postId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  userId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  createdAt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  updatedAt: string;
}

export class GetAllPostLikeParamsDto extends GetPaginatedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  postId: number;
}

export class CreatePostLikeDto extends CreatedById {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  content: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  postId: number;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  userId: number;
}

export class UpdatePostLikeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  content: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  postId: number;
}
