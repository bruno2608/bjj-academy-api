// src/users/users.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(4)
  async listarPorAcademia(@User() user: any): Promise<UsuarioResponseDto[]> {
    return this.usersService.listarPorAcademia(user.academia_id);
  }

  @Post()
  @Roles(4)
  async criar(@Body() data: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    return this.usersService.criar(data);
  }
}
