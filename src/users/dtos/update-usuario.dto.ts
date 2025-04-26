import { IsOptional, IsString, IsDateString, IsUUID, IsInt, Min, Max } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsDateString()
  data_nascimento?: string;

  @IsOptional()
  @IsUUID()
  faixa_id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6) // até 6 graus para casos infantis, conforme combinamos
  grau?: number;
}
