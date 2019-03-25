'use strict'

const express = require('express')
const chalk = require('chalk')
const api = express.Router()

api.get('/prueba/:username/:password/:userIp', (req, res, next) => {
  const { username, password, userIp } = req.params
  console.log(`${chalk.yellow('username:')} ${username}, ${chalk.yellow('password:')} ${password} ++UserIp: ${userIp}`)
  return res.send('estamos online desde la api!!')
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]-api/api.js: ')} ${err.message}`)
  console.error(err.message)
  process.exit(1)
}

module.exports = api
