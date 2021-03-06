const express = require('express')
const session = require('express-session')
const users = require('./users/routes.js')
const auth = require('./auth/routes.js')

const server = express()

server.use(express.json())

// configure express-session middleware
server.use(
  session({
    name: 'webauth1', // default=connect.sid
    secret: 'shhhhh.supersecret!!!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
)

server.use('/api/users', users)
server.use('/api/auth', auth)
server.get('/', (req, res, next) => {
  res.send(`API Server is running!`)
})

module.exports = server
