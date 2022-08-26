# API utilizando AWS Cognito

API desenvolvida em **NodeJS** com **Express**, utilizando **AWS Cognito** para a autenticação.

## 🚀 Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)
- [Express](https://expressjs.com/)
- [AWS Cognito](https://aws.amazon.com/pt/cognito/)

---

## 📦 Como rodar o projeto

<br>

## 1 - Clonar o repo

```bash
# Clonar o repositório
$ git clone https://github.com/devmatheusmota/api-cognito.git

# Entrar no repositório
$ cd api-cognito
```

## 2 - Instalar as dependências

```bash
# Instalar as dependências
$ npm install
```

## 3 - Inicializar o projeto

```bash
#Inicializar o projeto
$ npm run start
```

# Usando a API

Voce pode acessar a API usando os seguintes endpoints:

## `/login`

### `POST`

- `/login` : Efetua login
  - Body:
    - `email: String` (requerido): Email do usuário
    - `password: String` (requerido): Senha do usuário
  - Retorno:
    - `token: String`: Bearer token utilizado pra ter acesso a todas as rotas da API
    - `refresh-token: String`: refresh token usado pra requerir um novo token de acesso após a expiração

## `/refresh-token`

### `POST`

- `/refresh-token` : Faz a requisicao de um novo token de acesso
  - Body:
    - `refresh_token: String` (requerido): refresh token usado pra requerir um novo token de acesso após a expiração
  - Retorno:
    - `token: String`: Bearer token utilizado pra ter acesso a todas as rotas da API
    - `newRefreshToken: String`: novo refresh token usado pra requerir um novo token de acesso após a expiração

## Para ter acesso a todas as rotas da API é necessário inserir um token funcional no header de Auth das requisições

## `/users`

### `GET`

- `/users` : Lista todos os usuários
- `/users/:id` : Lista um usuário pelo seu ID

### `POST`

- `/users` : Cria um novo usuário
  - Body:
    - `name: String` (opcional): Nome do usuário
    - `email: String` (requerido): Email do usuário

### `PUT`

- `/users/:id` : Atualiza dados do usuário pelo ID
  - Body:
    - `name: String` (opcional): Nome do usuário
    - `email: String` (opcional): Email do usuário

### `DELETE`

- `/users/:id` : Remove usuário pelo ID
  - Usuário somente é removido se não tiver nenhum post e nenhum perfil criado
    <br><br><br>

## `/posts`

### `GET`

- `/posts` : Lista todos os posts
- `/posts/:id` : Lista um post pelo seu ID
- `/posts/author/:id` : Lista posts pelo ID do autor

### `POST`

- `/posts` : Cria um novo post
  - Body:
    - `title: String` (opcional) : Título do post
    - `content: String` (opcional) : Conteúdo do post
    - `authorId: Number` (requerido) : ID do autor
    - `published: Boolean` (opcional) : Post publicado (default: false)

### `PUT`

- `/posts/:id/title` : Atualiza título do post pelo ID
  - Body
    - `title: String` (opcional) : Título do post
- `/posts/:id/content` : Atualiza conteúdo do post pelo ID
  - Body
    - `content: String` (opcional) : Conteúdo do post
- `/posts/:id/like` : Curte o post (i.e. Botão de Curtir)

### `DELETE`

- `/posts/:id` : Remove post pelo ID
  <br><br><br>

## `/profiles`

### `GET`

- `/profiles` : Lista todos os perfis
- `/profiles:id` : Lista perfil pelo ID

### `POST`

- `/profiles` : Cria um novo perfil
  - Body:
    - `bio: String` (opcional) : Biografia do perfil
    - `userId: Number` (requerido) : ID do dono do perfil

### `PUT`

- `/profiles/:id` : Atualiza perfil pelo ID
  - Body:
    - `bio: String` (opcional) : Biografia do perfil

### `DELETE`

- `/profiles/:id` : Remove perfil pelo ID
