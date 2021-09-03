const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const usersRouter = require('./users/users-router.js');
const authRouter = require("./auth/auth-router.js")

const server = express();

server.use(session({
  name:"chocolatechip",
  secret: "keep it secret, keep it safe",
  resave:false,
  saveUnitialized:false,

  store: new KnexSessionStore({
    knex:require("../data/db-config.js"),
    tablename:"sessions",
    sidfieldname:"sid",
    createTable:true,
    clearInterval:1000 * 60 * 60
  }),
  cookie:{
    maxAge: 1000 * 60 * 60,
    secure:true,
    httpOnly: true
  },
}))

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
