import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsUUID()
  @IsNotEmpty()
  academia_id: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty()
  senha: string;
}
