import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File;

    @ApiHideProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    userId: number;
}
