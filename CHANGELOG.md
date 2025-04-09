# Changelog

Todas as alterações importantes neste projeto serão documentadas aqui.

## [1.0.0] - 2025-04-09
- 🚀 início da estrutura da API da BJJ Academy com NestJS
- 🔐 implementação de autenticação JWT
- 🛡️ criação dos guards `JwtAuthGuard` e `RolesGuard`
- 🧠 uso dos decorators personalizados `@User` e `@Roles`
- 🧪 criação de uma rota protegida com nível de acesso (ex: @Roles(4))
- 📦 estrutura modular com controller, service e DTO inicial para usuários
