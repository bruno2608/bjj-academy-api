import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AcademiasService } from './academias.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';

@Controller('academias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AcademiasController {
  constructor(private readonly academiasService: AcademiasService) {}

  @Get('codigo-convite')
  @Roles(4) // Apenas Professores (nível 4+)
  async obterCodigoConvite(@User() user: any) {
    return this.academiasService.obterCodigoConvite(user.academia_id);
  }

  @Patch('codigo-convite')
  @Roles(4) // Apenas Professores (nível 4+)
  async atualizarCodigoConvite(@User() user: any) {
    return this.academiasService.atualizarCodigoConvite(user.academia_id);
  }
}
