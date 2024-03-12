import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { ERole } from 'src/common/enums/role.enum';

import { UserDto } from './login.dto';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  avatar?: string;

  @ApiProperty({ required: false })
  @IsString()
  gender?: string;

  @ApiProperty({ required: false })
  birthday?: Date;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  role?: ERole;
}

export class RegisterResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: UserDto;
}
