const express = require('express')
const usersRouter = require('./users/users-router')
const { logger } = require('./middleware/middleware')

const server = express()

server.use(express.json())
server.use(logger)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

server.get('*', (req, res, next) => {
  next({
    status: 404,
    message: `${req.method} method to ${req.originalUrl} not found.`
  })
})

server.use(errorHandling)

module.exports = server

function errorHandling(err, req, res, next) { //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'Something is wrong with server',
    stack: err.stack,
    message: err.message,
  })
}

