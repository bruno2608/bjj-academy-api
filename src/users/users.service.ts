import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import * as bcrypt from 'bcrypt';

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
  async listarPorAcademia(academia_id: string): Promise<UsuarioResponseDto[]> {
    const matriculas = await this.prisma.matriculas.findMany({
      where: { academia_id },
      include: {
        usuarios: {
          include: {
            usuarios_papeis_usuarios_papeis_usuario_idTousuarios: {
              include: {
                papeis: true,
              },
              orderBy: {
                papeis: {
                  nivel_acesso: 'desc',
                },
              },
              take: 1,
            },
          },
        },
      },
    });

    const usuarios = matriculas
      .filter((m) => m.usuarios !== null)
      .map((m) => {
        const usuario = m.usuarios!;
        const papelMaisAlto = usuario.usuarios_papeis_usuarios_papeis_usuario_idTousuarios?.[0]?.papeis;

        return plainToInstance(UsuarioResponseDto, {
          ...usuario,
          nivel_acesso: papelMaisAlto?.nivel_acesso ?? 1,
        });
      });

    return usuarios;
  }
}
