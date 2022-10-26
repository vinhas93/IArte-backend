import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CanvaModule } from './modules/canva/canva.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module';
import { MailModule } from './modules/mails/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ProducerModule } from './shared/sqs/producer/producer.module';
import { ConsumerModule } from './shared/sqs/consumer/consumer.module';
import { UpdateCanvaByIdService } from './modules/canva/services';
import { HistoricModule } from './modules/historic/historic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    CanvaModule,
    UploadModule,
    MailModule,
    ProducerModule,
    ConsumerModule,
    HistoricModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
