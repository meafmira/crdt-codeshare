# CRDT-base codesharing webapp example

## Concepts

App uses CRDT for collaborative editing and implement it throgh logux web framework.

## Implementing backend server

App uses [logux](https://logux.io) as CRDT server:

- Backend [protocol](https://logux.io/protocols/backend/spec/) for implement own server
- Implement proxy server [instructions](https://logux.io/guide/starting/proxy-server/) simple proxying websocket to http protocol
- There are also [django](https://github.com/logux/django) and [ruby on rails](https://github.com/logux/logux_rails) logux servers

## Api

Server file in api/server.js. U could choose any db to persist session datas. Now it uses memory storage.

To run server:

```bash
npm run server:start
// or
yarn server:start
```

## Client

To run client:

```bash
npm run start
// or
yarn start
```

Build client:

```bash
npm run build
// or
yarn build
```
