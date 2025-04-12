import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUsuarioDto } from '../users/dtos/register-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Função para registrar novo usuário com base no código de convite
  async registrar(data: RegisterUsuarioDto) {
    const { nome, email, senha, codigo_convite } = data;

    const academia = await this.prisma.academias.findFirst({
      where: { codigo_convite },
    });

    if (!academia) throw new Error('Código de convite inválido');

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await this.prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });

    const ultimaMatricula = await this.prisma.matriculas.findFirst({
      where: { academia_id: academia.id },
      orderBy: { numero: 'desc' },
    });

    const numeroMatricula =
      ultimaMatricula?.numero != null ? ultimaMatricula.numero + 1 : 1;

    await this.prisma.matriculas.create({
      data: {
        numero: numeroMatricula,
        aluno_id: novoUsuario.id,
        academia_id: academia.id,
        status: 'ativo',
        data_inicio: new Date(),
      },
    });

    return this.login({ email, senha });
  }

  // Função de login: verifica credenciais e retorna token JWT
  async login(data: { email: string; senha: string }) {
    const { email, senha } = data;

    // 1. Buscar usuário e seus papéis
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
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
    });

    if (!usuario) throw new UnauthorizedException('Usuário não encontrado');
    if (!usuario.senha) throw new UnauthorizedException('Senha inválida');

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new UnauthorizedException('Senha inválida');

    // 2. Buscar academia_id separadamente da matrícula
    const ultimaMatricula = await this.prisma.matriculas.findFirst({
      where: { aluno_id: usuario.id },
      orderBy: { numero: 'desc' },
    });

    if (!ultimaMatricula?.academia_id) {
      throw new UnauthorizedException('Usuário não possui matrícula válida');
    }

    const academia_id = ultimaMatricula.academia_id;
    const nivel_acesso =
      usuario.usuarios_papeis_usuarios_papeis_usuario_idTousuarios?.[0]?.papeis?.nivel_acesso ?? 1;

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      academia_id,
      nivel_acesso,
    };

    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
