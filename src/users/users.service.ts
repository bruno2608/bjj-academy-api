import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async listarPorAcademia(academia_id: string) {
    return this.prisma.$queryRawUnsafe(`
      SELECT 
        u.id,
        u.nome,
        u.email,
        u.telefone,
        u.genero,
        u.data_nascimento,
        u.ativo,
        MAX(p.nivel_acesso) AS nivel_acesso,
        MAX(p.nome) AS papel
      FROM matriculas m
      JOIN usuarios u ON u.id = m.aluno_id
      LEFT JOIN usuarios_papeis up ON up.usuario_id = u.id
      LEFT JOIN papeis p ON p.id = up.papel_id
      WHERE m.academia_id = '${academia_id}'
      GROUP BY u.id, u.nome, u.email, u.telefone, u.genero, u.data_nascimento, u.ativo
      ORDER BY u.nome;
    `);
  }

  async atualizarPerfil(usuarioId: string, data: UpdateUsuarioDto) {
    return this.prisma.usuarios.update({
      where: { id: usuarioId },
      data: {
        telefone: data.telefone,
        genero: data.genero,
        data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : undefined,
        faixa_id: data.faixa_id,
        grau: data.grau,
        updated_at: new Date(),
      },
    });
  }
}
