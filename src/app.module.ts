import { CanvaModule } from './modules/canva/canva.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CanvaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
