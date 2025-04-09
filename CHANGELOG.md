# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.1.0 (2025-04-09)


### Features

* **api:** estrutura inicial com autenticação JWT e0bfa4c

## [1.0.0] - 2025-04-09
- 🚀 início da estrutura da API da BJJ Academy com NestJS
- 🔐 implementação de autenticação JWT
- 🛡️ criação dos guards `JwtAuthGuard` e `RolesGuard`
- 🧠 uso dos decorators personalizados `@User` e `@Roles`
- 🧪 criação de uma rota protegida com nível de acesso (ex: @Roles(4))
- 📦 estrutura modular com controller, service e DTO inicial para usuários
