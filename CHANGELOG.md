# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/bruno2608/bjj-academy-api/compare/v1.3.0...v1.4.0) (2025-04-09)


### Features

* **api:** torna academia_id obrigatório para usuário ([a600eaf](https://github.com/bruno2608/bjj-academy-api/commit/a600eaff22df839491334a0db9dc9b6250aeeaef))

## [1.3.0](https://github.com/bruno2608/bjj-academy-api/compare/v1.2.3...v1.3.0) (2025-04-09)

### [1.2.3](https://github.com/bruno2608/bjj-academy-api/compare/v1.2.2...v1.2.3) (2025-04-09)

### [1.2.2](https://github.com/bruno2608/bjj-academy-api/compare/v1.2.1...v1.2.2) (2025-04-09)

### [1.2.1](https://github.com/bruno2608/bjj-academy-api/compare/v1.2.0...v1.2.1) (2025-04-09)

## [1.2.0](https://github.com/bruno2608/bjj-academy-api/compare/v1.1.0...v1.2.0) (2025-04-09)


### Features

* **api:** estrutura base com JWT e conexão ao Supabase ([b17c09d](https://github.com/bruno2608/bjj-academy-api/commit/b17c09dd1a2a6a3a84bf20396bf0d9f624ac0c82))

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
