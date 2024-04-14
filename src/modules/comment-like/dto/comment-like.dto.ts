import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';
import { CreatedById } from 'src/entities/full-audited.entity';

export class GetAllCommentLikeDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  content: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  commentId: number;

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

export class GetAllCommentLikeParamsDto extends GetPaginatedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  commentId: number;
}

export class CreateCommentLikeDto extends CreatedById {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  content: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  commentId: number;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  userId: number;
}

export class UpdateCommentLikeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  content: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  commentId: number;
}
