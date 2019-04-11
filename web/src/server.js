'use strict'

const express = require('express')
const http = require('http')
const path = require('path')
const routes = require('./api')
const socket = require('socket.io')
const mongoose = require('mongoose')
const chalk = require('chalk')
const debug = require('debug')('WEB-server')
const asyncify = require('express-asyncify')

const app = asyncify(express())
const server = http.createServer(app)


// settings
const port = process.env.PORT || 3000


// db connection
mongoose.connect('mongodb://localhost/web-chat', { useNewUrlParser: true }) // esta coneccion se hace o con callbacks o con promesas (es mejor con promesa aun que si se pudiera con async await seria mucho mejor pero ni modo)
.then(db => {
  console.log(`${chalk.green('[Web-server]')} db is connected`)
  // CUANDO CARGA LA BASE DE DATOS, CONECTAMOS EL SOCKET.IO
  const io = socket.listen(server)
  // DESPUES DE CONECTAR EL SOCKET.IO ACTIVAMOS EL ARCHIVO QUE MANEJA LOS EVENTOS DEL SERVIDOR
  require('./sockets')(io)
  // DESPUES DE TENER FUNCIONANDO: 1) LA DB 2) EL SOCKET.IO 3) EL ARCHIVO MANEJADOR DE EVENTOS DEL SERVIDOR---- CARGAMOS LAS VISTAS CON SUS STATICS FILES
  app.use('/chat', express.static(path.join(__dirname, 'public/static_files2/static_files'))) // this is the chat view, it doesn't work in the api.js file
  app.use('/chat_moderator', express.static(path.join(__dirname, 'public'))) // this is the chat view, it doesn't work in the api.js file
  app.use('/chat_moderator2', express.static(path.join(__dirname, 'public/static_files2'))) // this is the chat view, it doesn't work in the api.js file
  app.get('*', routes)
})
.catch(err => handleFatalError(err))

/* MANEJO DE ERRORES */
app.use((err, req, res, next) => {
  console.log(`${chalk.red('WEB SERVER ERROR:')} ${err}`)
  debug(`${chalk.blue('Error:')} ${err.message}`)
  if (err.message.match(/not found/)) { // si en algun lugar dice not found
    return res.status(404).send({ error: err.message })
  }
  res.status(500).send({ error: `Api: ${err.message}` })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]-web/server.js: ')} ${err.message}`)
  console.error(err)
  process.exit(1)
}

if (!module.parent) {
  server.listen(port, () => {
    console.log(`${chalk.green('[Web-server]')} server ready and listening on port ${port}`)
  })
}
