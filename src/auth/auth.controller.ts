// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../common/prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const { email, senha } = body;

    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        senha: true,
        academia_id: true,
        usuarios_papeis_usuarios_papeis_usuario_idTousuarios: {
          select: {
            papeis: {
              select: {
                nivel_acesso: true,
              },
            },
          },
        },
      },
    });

    if (!usuario || !usuario.senha) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const nivel_acesso =
      usuario.usuarios_papeis_usuarios_papeis_usuario_idTousuarios
        .filter((p) => p.papeis)
        .map((p) => p.papeis!.nivel_acesso)
        .reduce((max, curr) => Math.max(max, curr), 1); // padrão: 1

    return this.authService.login({
      id: usuario.id,
      email: usuario.email,
      academia_id: usuario.academia_id,
      nivel_acesso,
    });
  }
}
