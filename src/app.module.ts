// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
