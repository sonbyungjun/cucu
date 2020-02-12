# cucu
TypeScript Express Starter With CRUD Generator

## ⚙️ Installation

```sh
$ npm install -g cucu-generator
```

### Create the app

<img src='https://github.com/sonbyungjun/cucu/raw/images/project-generator.gif' border='0' alt='example' />

```bash
$ cucu-generator
? Select a templates (Use arrow keys)
❯ crud-generator 
  cucu-project-starter 
  ──────────────
```

### Select a templates 

```bash
$ cd "project name" && npm run dev
```

### swagger docs

Start your cucu-starter app in swagger docs at `http://localhost:3000/docs`

<img src='https://github.com/sonbyungjun/cucu/raw/images/localhost_3000_docs.png' border='0' alt='example' />

### Create the CRUD

<img src='https://github.com/sonbyungjun/cucu/raw/images/crud-generator.gif' border='0' alt='example' />

```bash
$ cucu-generator
? Select a templates (Use arrow keys)
  crud-generator 
❯ cucu-project-starter 
  ──────────────
```

<img src='https://github.com/sonbyungjun/cucu/raw/images/person.jpg' border='0' alt='example' />

### .env settings
```.env
KEY=hash
JWT_SECRET=secretKey

DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=sequelize
DB_HOST=localhost

SERVER_IP=localhost
PORT=3000
PROJECT_NAME=typeScript
```
