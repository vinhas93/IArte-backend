import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma/service/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CanvaModule } from './modules/canva/canva.module';
import { CategoryModule } from './modules/category/category.module';
import { RecordModule } from './modules/historic/record.module';
import { MailModule } from './modules/mails/mail.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { ConsumerModule } from './shared/sqs/consumer/consumer.module';
import { ProducerModule } from './shared/sqs/producer/producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CanvaModule,
    CategoryModule,
    MailModule,
    ProducerModule,
    ConsumerModule,
    RecordModule,
    UploadModule,
    UserModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
