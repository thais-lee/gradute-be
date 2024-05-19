import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from "@nestjs/config";
import { IAppConfig } from "src/configs/app.config";
import { IAuthConfig } from "src/configs/auth.config";
import { Readable } from "typeorm/platform/PlatformTools";
import { Media } from "src/entities/media.entity";


@Injectable()
export class FileService {
    constructor(
        @InjectRepository(Media) private readonly mediaRepository: Repository<Media>,
        private readonly configService: ConfigService<IAppConfig & IAuthConfig>,
    ) {
        cloudinary.config({
            cloud_name: this.configService.get("cloudinaryCloudName"),
            api_key: this.configService.get("cloudinaryApiKey"),
            api_secret: this.configService.get("cloudinaryApiSecret"),
        });
    }

    async upload(user: User, file: any) {
        try {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: `uploads/${user.id}`,
                        public_id: file.originalname
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Error uploading file:', error);
                            reject(error)
                        } else {
                            resolve(result.url)
                        }
                    }
                );

                let str = Readable.from(file.buffer);
                str.pipe(uploadStream);
            })

            await this.mediaRepository.save({
                fileUrl: result as string,
                userId: user.id
            });

            return {
                fileUrl: result
            }
        } catch (error) {
            console.log(error)
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}