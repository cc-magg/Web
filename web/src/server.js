'use strict'

const express = require('express')
const http = require('http')
const path = require('path')
const api = require('./api')
const socket = require('socket.io')
const mongoose = require('mongoose')
const chalk = require('chalk')
const debug = require('debug')('API-server')

const app = express()
const server = http.createServer(app)
const io = socket.listen(server)

// db connection
mongoose.connect('mongodb://localhost/web-chat', { useNewUrlParser: true }) // esta coneccion se hace o con callbacks o con promesas (es mejor con promesa aun que si se pudiera con async await seria mucho mejor pero ni modo)
.then(db => console.log('db is connected'))
.catch(err => console.log(err))

require('./sockets')(io)

// settings
const port = process.env.PORT || 3000
app.use(api)
app.use('/chat', express.static(path.join(__dirname, 'public'))) // this is the chat view, it doesn't work in the api.js file

/* MANEJO DE ERRORES */
app.use((err, req, res, next) => {
  console.log(`${chalk.red('SERVER ERROR:')} ${err}`)
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
