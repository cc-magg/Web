'use strict'

const express = require('express')
const http = require('http')
const api = require('./api')

const app = express()

const chalk = require('chalk')
const debug = require('debug')('API-server')

// settings
const port = process.env.PORT || 3000
app.use(api)

/* MANEJO DE ERRORES */
app.use((err, req, res, next) => {
  console.log(`${chalk.red('SERVER ERROR:')} ${err}`)
  debug(`${chalk.blue('Error:')} ${err.message}`)
  if (err.message.match(/not found/)) { // si en algun lugar dice not found
    return res.status(404).send({ error: err.message })
  }
  res.status(500).send({ error: `Api: ${err.message}` })
})

const server = http.createServer(app)
if (!module.parent) {
  server.listen(port, () => {
    console.log(`${chalk.green('[ERP-api]')} server ready and listening on port ${port}`)
  })
}
