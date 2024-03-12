import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EPostPrivacy, EPostStatus } from 'src/common/enums/post.enum';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  status: EPostStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  privacy: EPostPrivacy;
}
