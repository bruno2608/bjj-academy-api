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

- ✅ Login com verificação de senha via `bcrypt`
- ✅ Registro de usuários com `codigo_convite`
- ✅ Criação de matrícula incremental automática
- ✅ Extração de `academia_id` via token JWT
- ✅ Controle de papéis com `usuarios_papeis`
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

## 🔄 Melhorias Recentes (v1.4.4)

- Corrigido login com fallback para `matricula` via `findFirst`
- Garantido o campo `academia_id` no JWT
- Adicionada mensagem de erro clara se matrícula não existir
- Testado com Postman (coleção v4 + env com `{{token}}` e `{{base_url}}`)

---

## 🚧 Em desenvolvimento

- [ ] 🔎 Correção da listagem de usuários por academia (`GET /usuarios`)
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
