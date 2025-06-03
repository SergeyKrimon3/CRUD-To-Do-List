// JSON Server Module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("database.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
    jsonServer.rewriter({
        "/*": "/$1",
    })
);
server.use(router);

module.exports = server;