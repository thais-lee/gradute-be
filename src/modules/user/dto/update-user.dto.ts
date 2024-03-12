import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ERole } from 'src/common/enums/role.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthday?: Date;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  role?: ERole;
}
