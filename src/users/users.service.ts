import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';




@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Cadastro interno de aluno feito por um professor
  async criar(data: CreateUsuarioDto) {
    const { nome, email, senha, academia_id } = data;

    // 1. Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // 2. Criar o usuário
    const novoUsuario = await this.prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });

    // 3. Buscar última matrícula da academia
    const ultimaMatricula = await this.prisma.matriculas.findFirst({
      where: { academia_id },
      orderBy: { numero: 'desc' },
    });

    const numeroMatricula = ultimaMatricula?.numero != null
      ? ultimaMatricula.numero + 1
      : 1;

    // 4. Criar matrícula
    await this.prisma.matriculas.create({
      data: {
        numero: numeroMatricula,
        aluno_id: novoUsuario.id,
        academia_id,
        status: 'ativo',
        data_inicio: new Date(),
      },
    });

    // 5. Atribuir papel padrão: aluno (nível 1)
    await this.prisma.usuarios_papeis.create({
      data: {
        usuario_id: novoUsuario.id,
        papel_id: 1,
      },
    });

    return novoUsuario;
  }

  // Retorna todos os usuários vinculados a uma academia com seus níveis de acesso
  // Substitua o método antigo por este novo
  async listarPorAcademia(academia_id: string): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.prisma.$queryRawUnsafe<UsuarioResponseDto[]>(`
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
    return usuarios;
  }
}
