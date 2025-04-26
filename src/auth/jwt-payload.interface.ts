export interface JwtPayload {
    sub: string;         // UUID do usuário
    email: string;       // E-mail principal do usuário
    academia_id: string; // UUID da academia vinculada (via matrícula)
    nivel_acesso: number; // Maior nível de acesso do usuário (papel)
  }
  