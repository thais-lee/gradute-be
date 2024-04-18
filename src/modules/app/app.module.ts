import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import appConfig from 'src/configs/app.config';
import authConfig from 'src/configs/auth.config';
import databaseConfig from 'src/configs/database.config';
import { DatabaseModule } from 'src/database/database.module';
import { GlobalExceptionFilter } from 'src/filters/global-exception.filter';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CommentModule } from 'src/modules/comment/comment.module';
import { PostModule } from 'src/modules/post/post.module';
import { UserModule } from 'src/modules/user/user.module';

import { CommentLikeModule } from '../comment-like/comment-like.module';
import { PostLikeModule } from '../post-like/post-like.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
      envFilePath: ['.env.local'],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
    PostLikeModule,
    CommentModule,
    CommentLikeModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
