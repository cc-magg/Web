'use strict'

const asyncify = require('express-asyncify')
const express = require('express')
const http = require('http')
//const api = require('./api')

const app = asyncify(express())

const chalk = require('chalk')
const debug = require('debug')('API-server')

const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// settings
const port = process.env.PORT || 3000
nextApp.prepare().then(() => {

  app.get('/sw.js', (req, res) => {
    res.sendFile(__dirname + "/static/sw.js");
  })

  app.get('*', (req, res) => nextHandler(req, res))

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
}).catch(err => {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
})