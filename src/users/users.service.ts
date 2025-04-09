import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async listarPorAcademia(academia_id: string): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.prisma.usuarios.findMany({
      where: { academia_id },
      select: {
        id: true,
        nome: true,
        email: true,
        academia_id: true,
      },
    });

    return usuarios;
  }
}
