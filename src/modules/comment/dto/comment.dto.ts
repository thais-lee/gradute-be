import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ECommentStatus, ECommentType } from 'src/common/enums/comment.enum';
import { CreatedById } from 'src/entities/full-audited.entity';

export class CreateCommentDto extends CreatedById {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  postId: number;

  @ApiHideProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  parentId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  status: ECommentStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  privacy: ECommentType;
}

export class UpdateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  status: ECommentStatus;
}
