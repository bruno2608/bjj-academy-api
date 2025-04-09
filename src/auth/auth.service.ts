import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      nivel_acesso: user.nivel_acesso,
      academia_id: user.academia_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
