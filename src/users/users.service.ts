import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async listarPorAcademia(academia_id: string) {
    return this.prisma.usuarios.findMany({
      where: { academia_id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
      },
    });
  }
}
