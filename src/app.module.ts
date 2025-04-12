import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AcademiasModule } from './academias/academias.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UsersModule,
    AcademiasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
