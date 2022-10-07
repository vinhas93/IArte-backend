import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CanvaModule } from './modules/canva/canva.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [UserModule, AuthModule, CategoryModule, CanvaModule, UploadModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
