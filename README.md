<div align="center">
  <img src="https://i.imgur.com/WdGink9.png" alt="Logo do BJJ Academy" width="220" />

  <h1>BJJ Academy API 🥋</h1>
  <p>API RESTful para gerenciamento de academias de Jiu-Jitsu Brasileiro, construída com NestJS e autenticação via JWT.</p>

  <p align="center">
    <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" alt="Status do Projeto" />
    <img src="https://img.shields.io/badge/NestJS-v10.x-red" alt="NestJS" />
    <img src="https://img.shields.io/badge/PostgreSQL-SQL-blue" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/JWT-autentica%C3%A7%C3%A3o-green" alt="JWT" />
  </p>
</div>

---

## 🚀 Tecnologias Utilizadas

- 🧠 **NestJS** — framework backend com suporte a injeção de dependência
- 🔐 **JWT** — autenticação baseada em tokens
- 🛡 **Guards & Decorators** — proteção por nível de acesso (ex: `@Roles(4)`, `@User`)
- 🗃 **PostgreSQL** — banco de dados relacional
- 📊 **Prisma ORM** — mapeamento de dados e validações
- 🌐 **Supabase** — provedor backend utilizado com PostgreSQL
- 📚 **Swagger** — documentação interativa da API (em breve)

---

## 🔐 Estrutura de Segurança

A lógica de controle de acesso foi migrada do Supabase (RLS) para código explícito no backend:

- Controle de acesso por `nivel_acesso` baseado na tabela `usuarios_papeis`
- Validação de associação por `academia_id` (via tabela `matriculas`)
- Proteção por Guards e Decorators customizados

---

## ✅ Funcionalidades Atuais

- ✅ Login com verificação de senha via `bcrypt`e autenticação via JWT (`POST /auth/login`)
- ✅ Registro de usuários com código de convite (`POST /auth/registrar`)
- ✅ Criação automática de matrícula com número incremental
- ✅ Atribuição do papel padrão "Aluno" no cadastro
- ✅ Inclusão de `academia_id` e `nivel_acesso` no token
- ✅ Proteção de rotas com `JwtAuthGuard`, `@Roles()` e `@User()`
- ✅ Listagem de usuários da mesma academia com nível de acesso e papel
- ✅ Rota protegida para consulta de código de convite

---

## 📘 Endpoints Disponíveis

| Método | Rota                                  | Descrição                                                        |
|--------|---------------------------------------|------------------------------------------------------------------|
| POST   | `/auth/registrar`                     | Registro de aluno via código de convite                         |
| POST   | `/auth/login`                         | Login com e-mail e senha (retorna JWT)                          |
| GET    | `/usuarios`                           | Listagem de usuários da mesma academia (nível 4+)               |
| GET    | `/academias/codigo-convite`           | Consulta do código de convite da academia do token (nível 4+)   |
| PATCH  | `/academias/codigo-convite`           | Gera novo código de convite aleatório (nível 4+)                |

---

## 🔄 Melhorias Recentes

- Substituído include quebrado por `prisma.$queryRawUnsafe` na listagem de usuários
- Inclusão do campo `papel` (nome do papel com maior nível) no retorno do endpoint `/usuarios`
- Refatorado `users.service.ts` para filtrar por `matricula.academia_id`
- Atualizado o DTO `UsuarioResponseDto` para refletir campos reais do banco

---

## 🚧 Em desenvolvimento

- [x] 🔎 Correção da listagem de usuários por academia (`GET /usuarios`)
- [ ] ✅ Finalização do fluxo de cadastro com matrícula + papel automático
- [ ] 🔐 Implementação de alteração de senha (`PATCH /auth/alterar-senha`)
- [ ] 📘 Documentação Swagger com exemplos e tags (`/api`)
- [ ] 🖼 Upload de avatar com Supabase Storage (`PATCH /usuarios/avatar`)
- [ ] 🧩 Módulo de turmas, presenças e graduações
  - [ ] Cadastro de turmas e horários
  - [ ] Registro de presenças e faltas
  - [ ] Histórico de graduação (faixa, grau, data)
- [ ] 📱 Integração com o app React Native (mobile-first)


---

## 🧠 Funcionalidades previstas

Funcionalidades planejadas para reforçar a segurança, controle e experiência do usuário no fluxo de autenticação e gestão:

- [ ] 🔁 Recuperação de senha (esqueci minha senha)
  - Envio de token por e-mail
  - Reset de senha com token temporário
- [ ] 🛠 Endpoint `/auth/me` para obter dados do usuário autenticado
- [ ] 🔒 Alteração de senha com verificação da senha atual
- [ ] 🔄 Expiração controlada do token JWT
- [ ] 🔐 Suporte a refresh token (pensando no app mobile)
- [ ] 🚪 Endpoint opcional de logout (revogação de sessão com blacklist)
- [ ] 👥 Múltiplas matrículas por usuário com seleção de academia (admin)
- [ ] 👨‍🏫 Vincular usuário manualmente a turmas no cadastro
- [ ] 🧼 Auditoria e logs de acesso (futuro)

> Essas funcionalidades expandem o escopo da API e estarão disponíveis em versões futuras com base na evolução do app e necessidades dos usuários.

---

## 🧪 Testes com Postman

Você pode testar todos os fluxos da API com os arquivos abaixo:

- 📂 [Collection v8](docs/postman/bjj-academy-api-collection-v8.json)
- 🌍 [Ambiente](docs/postman/bjj-academy-api-environment.json)

Basta importar ambos no Postman e ativar o ambiente antes de fazer login.
---

## 📦 Scripts úteis

```bash
npm install         # Instala as dependências
npm run start:dev   # Inicia a API em modo de desenvolvimento
npm run build       # Compila para produção
```

---

## 📄 Licença

Este projeto está sob uma licença personalizada de uso privado.  
© 2025 Bruno Alves Franca — Todos os direitos reservados.

Para uso comercial ou autorização, entre em contato:  
📩 [contatobalvesfranca@gmail.com](mailto:contatobalvesfranca@gmail.com)

---

## 👨‍💻 Autor

Feito com 💙 por [Bruno Alves Franca](https://github.com/balvesfranca)  
📸 Instagram: [@balvesfranca](https://instagram.com/balvesfranca)
