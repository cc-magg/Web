'use strict'

const express = require('express')
const chalk = require('chalk')
const api = express.Router()

api.get('/', (req, res, next) => {
  return res.send('aqui esta el home!')
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]-api: ')} ${err.message}`)
  console.error(err.message)
  process.exit(1)
}

module.exports = api
