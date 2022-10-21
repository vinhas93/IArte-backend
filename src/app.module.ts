import { VoucherModule } from './modules/voucher/voucher.module';
import { VoucherController } from './modules/voucher/voucher.controller';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CanvaModule,
    CategoryModule,
    MailModule,
    UploadModule,
    UserModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
