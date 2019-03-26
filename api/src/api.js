'use strict'

const express = require('express')
const chalk = require('chalk')
const api = express.Router()
const tokenOptions = require('./auth')
const config = require('./config')
const util = require('util') // es de node
const sign = util.promisify(tokenOptions.sign) // para volver de callback a promesa
const verify = util.promisify(tokenOptions.verify)
const auth = require('express-jwt')

api.get('/prueba/:username/:password/:userIp', auth(config.auth), (req, res, next) => {
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
