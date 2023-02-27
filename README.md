# RS Trello

it is a project management tool, a clone of [Trello](https://trello.com/). Plan projects and track tasks

## Deploy

https://trello-clone-panthers.netlify.app/

## Tech stack

### Frontend:

- TypeScript
- React
- React-redux
- Axios
- [Antd](https://ant.design/)
- Sass

### Backend:

- [Strapi](https://strapi.io/)
- Postman

## Deployment

Deployed version is [here](https://trello-clone-panthers.netlify.app/).

If the deployed project doesn't work install the project locally
_(see below)_:

### Frontend:

#### Run Locally

Clone the project

```bash
  git clone https://github.com/myspecialspace/rsclone
```

Go to the project directory

```bash
  cd [your folder name]
```

Install dependencies

```bash
  npm install --no-audit
```

Start the server

```bash
  npm run start
```

### Backend:

#### Run Locally

clone strapi locally

```bash
  git clone https://github.com/myspecialspace/trello-strapi
```

Install dependencies

```bash
npm run install
```

Import

```bash
npm run import
```

Start the server

```bash
npm run start
```

Change API_URL for

```bash
http://localhost:1337/api
```
