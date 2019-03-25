'use strict'

const express = require('express')
const http = require('http')
const api = require('./api')
const chalk = require('chalk')
const debug = require('debug')('API-server')

const app = express()
const server = http.createServer(app)

// settings
const port = process.env.PORT || 4000
app.use('/api', api)

/* MANEJO DE ERRORES */
app.use((err, req, res, next) => {
  console.log(`${chalk.red('API SERVER ERROR:')} ${err}`)
  debug(`${chalk.blue('Error:')} ${err.message}`)
  if (err.message.match(/not found/)) { // si en algun lugar dice not found
    return res.status(404).send({ error: err.message })
  }
  res.status(500).send({ error: `Api: ${err.message}` })
})

if (!module.parent) {
  server.listen(port, () => {
    console.log(`${chalk.green('[ERP-api]')} server ready and listening on port ${port}`)
  })
}
