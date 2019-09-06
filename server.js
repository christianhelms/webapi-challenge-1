const express = require('express');
const projectRouter = require('./project/project-router');
const actionRouter = require('./action/action-router')
const server = express();

server.use(express.json());
server.use('/projects', projectRouter);
server.use('/actions', actionRouter)

server.get('/', (req, res) => {
  res.send(`<h2>It's Alive!!!</h2>`);
});

module.exports = server;