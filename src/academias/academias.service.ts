import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AcademiasService {
  constructor(private prisma: PrismaService) {}

  private gerarCodigoConvite(): string {
    const sufixo = randomBytes(3).toString('hex').toUpperCase(); // Ex: A1B2C3
    return `BJJ-${sufixo}`;
  }

  async obterCodigoConvite(academia_id: string): Promise<{ codigo_convite: string }> {
    const academia = await this.prisma.academias.findUnique({
      where: { id: academia_id },
    });

    if (!academia) {
      throw new NotFoundException('Academia não encontrada');
    }

    if (!academia.codigo_convite) {
      const novoCodigo = this.gerarCodigoConvite();
      await this.prisma.academias.update({
        where: { id: academia_id },
        data: { codigo_convite: novoCodigo },
      });
      return { codigo_convite: novoCodigo };
    }

    return { codigo_convite: academia.codigo_convite };
  }

  async atualizarCodigoConvite(academia_id: string): Promise<{ codigo_convite: string }> {
    const novaChave = this.gerarCodigoConvite();

    await this.prisma.academias.update({
      where: { id: academia_id },
      data: { codigo_convite: novaChave },
    });

    return { codigo_convite: novaChave };
  }

  async buscarPorCodigoConvite(codigo_convite: string) {
    return this.prisma.academias.findFirst({
      where: { codigo_convite },
    });
  }
}
