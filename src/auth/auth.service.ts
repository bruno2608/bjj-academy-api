import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: {
    id: string;
    email: string;
    academia_id: string;
    nivel_acesso: number;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      academia_id: user.academia_id,
      nivel_acesso: user.nivel_acesso,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
