# Quipux — Teste técnico

Aplicação de cadastro de pessoas com autenticação JWT, em duas pastas:

- [`api/users-api`](api/users-api) — API REST em Java
- [`web/quipux-users`](web/quipux-users) — SPA em React

---

## API

Backend em **Java 17** com **Spring Boot 4.1.1**, Spring Security + JWT, Spring Data JPA e PostgreSQL. CPF é validado com o algoritmo brasileiro (11 dígitos, rejeita sequências repetidas e confere os dígitos verificadores). O valor é normalizado (somente números) antes de gravar ou buscar.

Base URL: `http://localhost:8080` (sem prefixo de contexto).

Rotas públicas: `POST /register` e `POST /login`. As demais exigem:

```http
Authorization: Bearer <token>
```

### Como subir

```bash
cd api/users-api
cp .env.example .env
docker compose up -d --build
```

A API sobe na porta **8080** e o Postgres na **5432**.

### Erros

Respostas de erro seguem o formato:

```json
{
  "status": 400,
  "message": "Erro de validação",
  "errors": [
    { "field": "cpf", "message": "O CPF deve ser válido" }
  ]
}
```

| Status | Quando |
|--------|--------|
| 400 | Validação de body ou path (CPF, e-mail, campos obrigatórios) |
| 401 | Credenciais inválidas ou JWT ausente/inválido |
| 404 | Pessoa não encontrada |
| 409 | E-mail ou CPF já cadastrado |
| 502 | Falha ao consultar o serviço externo de nacionalidade |

---

### `POST /register`

Cria um usuário da API. **Público.** Não devolve JWT — é preciso chamar `/login` em seguida.

**Body**

```json
{
  "email": "string",
  "password": "string"
}
```

`email` e `password` são obrigatórios; `email` deve ser um e-mail válido.

**Sucesso** — `201 Created`

```json
{
  "id": "uuid",
  "email": "string"
}
```

**Erros** — `400` validação; `409` e-mail já cadastrado.

---

### `POST /login`

Autentica o usuário e devolve o token JWT (validade padrão de 24h). **Público.**

**Body**

```json
{
  "email": "string",
  "password": "string"
}
```

**Sucesso** — `200 OK`

```json
{
  "authToken": "string"
}
```

**Erros** — `400` validação; `401` credenciais inválidas (mesma mensagem se o e-mail não existir ou a senha estiver errada).

---

### `POST /registrarName`

Cadastra uma pessoa. **Requer JWT.**

**Body**

```json
{
  "cpf": "string",
  "name": "string",
  "surname": "string",
  "email": "string"
}
```

Todos os campos são obrigatórios. `cpf` aceita formatado (`000.000.000-00`) ou só dígitos; `email` deve ser válido. O CPF é gravado só com 11 dígitos.

**Sucesso** — `201 Created`

```json
{
  "id": "uuid",
  "cpf": "string",
  "name": "string",
  "surname": "string",
  "email": "string"
}
```

**Erros** — `400` validação; `401` não autorizado; `409` CPF já cadastrado.

---

### `GET /list`

Lista todas as pessoas. **Requer JWT.** Sem paginação ou filtros.

**Sucesso** — `200 OK`

```json
[
  {
    "id": "uuid",
    "cpf": "string",
    "name": "string",
    "surname": "string",
    "email": "string"
  }
]
```

**Erros** — `401` não autorizado.

---

### `GET /list/{cpf}`

Busca uma pessoa pelo CPF. **Requer JWT.**

**Path** — `cpf` validado (`@ValidCpf`). Pode ir formatado ou só com dígitos.

**Sucesso** — `200 OK` (mesmo objeto de pessoa do cadastro).

**Erros** — `400` CPF inválido; `401` não autorizado; `404` pessoa não encontrada.

---

### `DELETE /list/{cpf}`

Remove a pessoa pelo CPF. **Requer JWT.**

**Path** — `cpf` com a mesma validação de `GET /list/{cpf}`.

**Sucesso** — `204 No Content` (sem body).

**Erros** — `400` CPF inválido; `401` não autorizado; `404` pessoa não encontrada.

---

### `GET /findNacionalityByPerson/{cpf}`

Prevê a nacionalidade da pessoa a partir do **primeiro nome**, via [nationalize.io](https://api.nationalize.io). **Requer JWT.**

**Path** — `cpf` validado.

**Sucesso** — `200 OK`

```json
{
  "id": "uuid",
  "name": "string",
  "nationalities": [
    {
      "country_id": "BR",
      "probability": 0.85
    }
  ]
}
```

Se a API externa não devolver países, `nationalities` vem vazio.

**Erros** — `400` CPF inválido; `401` não autorizado; `404` pessoa não encontrada; `502` falha no serviço externo.

---

## Web

SPA em [`web/quipux-users`](web/quipux-users) para usar a API: login e cadastro de usuário, listagem, criação, busca por CPF e exclusão de pessoas, com previsão de nacionalidade no card.

### Tecnologias

- **React 19** e **TypeScript**
- **Vite 8**
- **Tailwind CSS 4**
- **shadcn/ui** (Base UI)
- **TanStack Query** para cache e requests
- **Axios** (`VITE_API_URL`, padrão `http://localhost:8080`)
- **React Hook Form** + **Zod** (validação de formulários, inclusive CPF)

O JWT fica no `localStorage` e vai no header `Authorization` das rotas protegidas.

### Como subir

```bash
cd web/quipux-users
npm install
cp .env.example .env
npm run dev
```

Ajuste `VITE_API_URL` no `.env` se a API não estiver em `http://localhost:8080`.
