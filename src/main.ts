import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { IAppConfig } from 'src//configs/app.config';
import { AppModule } from 'src/modules/app/app.module';

import { setupSwagger } from './setup/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService: ConfigService<IAppConfig> = app.get(ConfigService);

  app.enableCors();

  setupSwagger({
    app,
    title: 'Security CheckIn API Documents',
    prefix: configService.get('apiPrefix'),
  });

  const port = configService.get('port');
  await app.listen(port, () => {
    logger.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();
