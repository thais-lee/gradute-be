import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EPostPrivacy, EPostStatus } from 'src/common/enums/post.enum';
import { CreatedById } from 'src/entities/full-audited.entity';

export class CreatePostDto extends CreatedById {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  imageUrls: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  status: EPostStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  privacy: EPostPrivacy;

  @ApiHideProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
