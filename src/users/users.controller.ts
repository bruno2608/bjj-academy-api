import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@User() user: JwtPayload) {
    return this.usersService.listarPorAcademia(user.academia_id);
  }

  @Patch('me')
  async updateMe(
    @User() user: JwtPayload,
    @Body() data: UpdateUsuarioDto,
  ) {
    return this.usersService.atualizarPerfil(user.sub, data);
  }
}
