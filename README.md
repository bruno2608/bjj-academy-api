
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
- 📊 **Prisma ORM** — mapeamento de dados e validações (em breve)
- 📚 **Swagger** — documentação interativa da API (em breve)

---

## 🔐 Estrutura de Segurança

A antiga lógica RLS do Supabase foi migrada para **código explícito**, com total controle sobre:

- Níveis de acesso por `nivel_acesso`
- Validação de vínculo com `academia_id`
- Separação entre aluno, instrutor e administrador

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(4) // Admin
@Get('/usuarios')
findAll(@User() user) {
  return this.usuarioService.findByAcademia(user.academia_id);
}
```

---

## 📁 Estrutura do Projeto

```
bjj-academy-api/
│
├── src/
│   ├── auth/                  # Lógica de autenticação e JWT
│   ├── common/                # Guards e Decorators reutilizáveis
│   ├── usuarios/              # Módulo inicial com rota protegida
│   └── main.ts
├── .env                       # Variáveis de ambiente (ex: JWT_SECRET)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📋 Funcionalidades Atuais

- ✅ Login via token JWT
- ✅ Decorator `@User()` para pegar usuário autenticado
- ✅ Guard `@Roles()` para proteger endpoints com base no nível
- ✅ Estrutura modular e escalável
- ✅ Separação clara entre lógica de autenticação e regras de negócio

---

## 🚧 Em desenvolvimento

- [ ] Registro de usuários
- [ ] Upload de avatar
- [ ] Integração com Supabase Storage
- [ ] Swagger completo (`/api`)
- [ ] Conexão com o app React Native

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
