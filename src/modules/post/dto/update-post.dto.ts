import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { EPostPrivacy, EPostStatus } from 'src/common/enums/post.enum';

export class UpdatePostDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  content?: string;

  @ApiProperty()
  @IsOptional()
  imageUrls?: string[];

  @ApiProperty()
  @IsOptional()
  @IsInt()
  status: EPostStatus;

  @ApiProperty()
  @Optional()
  @IsInt()
  privacy: EPostPrivacy;
}
