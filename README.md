<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) server as proxy to consume GitHub API.

## Prerequisites

To consume the GitHub API a <b>GITHUB_TOKEN</b> is required to access and avoid the request limit.

Follow the steps to get your token.

1. Login to [https://github.com/](https://github.com/).
2. Go to your user profile icon and select Settings.
3. Select Developer Settings under your profile settings.
4. Go to Personal access tokens > Tokens (classic).
5. Generate a new token (classic) for general use. Github should ask for your password to confirm access.
6. After confirm access you can create the token.
   - Note: SET REFERENCIAL NOTE ABOUT API KEY USAGE
   - Expiration: SET YOUR EXPIRATION DATE
   - Scopes: SELECT SCOPE PERMISSION
     - [x] repo: public_repo
7. Update the token in `.env` file located in root base project <img src="images\envfile.jpg" width="400" alt="Demo">

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```
## Test the app

```bash
$ npm run test
```

## Testing API

Run `npm run start` for a dev server. Navigate to `http://localhost:3000/api`. The application will show Swagger API docs.

<img src="images\demo.jpg" width="900" alt="Demo">

## Stay in touch

- Author - Axel Leguía Chero
- Linkedin - [https://www.linkedin.com/in/axel-leguia-chero/](https://www.linkedin.com/in/axel-leguia-chero/)
