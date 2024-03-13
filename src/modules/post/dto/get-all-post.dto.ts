import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { EPostPrivacy, EPostStatus } from 'src/common/enums/post.enum';
import { GetPaginatedDto } from 'src/common/get-paginated.dto';

export class GetAllPostDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Title' })
  title?: string;

  @ApiProperty({ example: 'Content' })
  content?: string;

  @ApiProperty({ example: 1 })
  status?: EPostStatus;

  @ApiProperty({ example: 1 })
  privacy?: EPostPrivacy;
}

export class GetPostQuery extends GetPaginatedDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    required: false,
    type: 'enum',
    enum: EPostStatus,
    default: EPostStatus.NEW,
  })
  @IsOptional()
  status?: EPostStatus;

  @ApiProperty({
    required: false,
    type: 'enum',
    enum: EPostPrivacy,
    default: EPostPrivacy.PUBLIC,
  })
  @IsOptional()
  privacy?: EPostPrivacy;
}
