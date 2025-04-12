// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUsuarioDto } from '../users/dtos/register-usuario.dto';

// Define o controller com a rota base "auth"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint POST /auth/registrar para registrar um novo usuário
  @Post('registrar')
  registrar(@Body() body: RegisterUsuarioDto) {
    return this.authService.registrar(body);
  }

  // Endpoint POST /auth/login para realizar login
  @Post('login')
  login(@Body() body: { email: string; senha: string }) {
    return this.authService.login(body);
  }
}
