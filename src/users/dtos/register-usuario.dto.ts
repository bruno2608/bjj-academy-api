// src/users/dtos/register-usuario.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  codigo_convite: string;
}
