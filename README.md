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

## `/auth`

### `POST`

- `/auth/signup` :

  - Body:
    - `username: String` (requerido): Nome de usuário
    - `password: String` (requerido): Senha do usuário
    - `name: String` (requerido): Nome do usuário
    - `family_name: String` (requerido): Sobrenome do usuário
    - `email: String` (requerido): Email do usuário
    - `birthdate: String` (requerido): Data de nascimento

- `/auth/verify` :

  - Body:
    - `username: String` (requerido): Nome de usuário cadastrado
    - `code: String` (requerido): Código enviado para o email cadastrado

- `/auth/signin` :
  - Body:
    - `username: String` (requerido): Nome de usuário
    - `password: String` (requerido): Senha do usuário
  - Retorno
    - Será retornado um Bearer Token no console, que poderá ser usado para acessar a secret page.

## `/protected`

### `GET`

- `/protected/secret`
  - Header
    - O Bearer Token gerado no login deve ser adicionado a Auth do Header da requisição
