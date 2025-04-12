import { Module } from '@nestjs/common';
import { AcademiasService } from './academias.service';
import { AcademiasController } from './academias.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [AcademiasController],
  providers: [AcademiasService, PrismaService],
  exports: [AcademiasService],
})
export class AcademiasModule {}
