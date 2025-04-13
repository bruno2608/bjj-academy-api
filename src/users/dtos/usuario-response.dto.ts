// src/users/dtos/usuario-response.dto.ts
export class UsuarioResponseDto {
  id: string;
  nome: string;
  email: string;
  telefone?: string | null;
  genero?: string | null;
  data_nascimento?: Date | null;
  ativo?: boolean | null;
  nivel_acesso?: number | null;
  papel?: string | null;
}


