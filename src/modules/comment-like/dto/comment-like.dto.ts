import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatedById } from 'src/entities/full-audited.entity';

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

export class UpdateCommentDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  content: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  commentId: number;
}
