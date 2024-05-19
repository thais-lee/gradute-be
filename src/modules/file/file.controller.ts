import { Body, Controller, Put, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";
import { FileUploadDto } from "./dto/file.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('file')
@ApiSecurity('access-token')
@ApiTags('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Upload file' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @Put('/upload')
    upload(@Request() req: any, @Body() fileUploadDto: FileUploadDto,  @UploadedFile() file: Express.Multer.File) {
        const user = req.user; 
        return this.fileService.upload(user, file);
    }

}