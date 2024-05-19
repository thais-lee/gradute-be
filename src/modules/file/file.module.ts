import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { Media } from "src/entities/media.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Media]), forwardRef(() => UserModule)],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService],
  })
  export class FileModule {}
  