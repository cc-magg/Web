'use strict'

const express = require('express')
const chalk = require('chalk')
const nodemailer = require('nodemailer')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())
const request = require('request-promise-native')
const { endpoint, apiToken } = require('./config')

api.get('/', (req, res) => {
  res.end(`Hola!`)
})

api.get('/prueba/:username/:password', async (req, res, next) => {
  const { username, password } = req.params
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress // ::1 es el ipv6 equivalente al 127.0.0.1 que es el localhost en ipv4
  const options = {
    method: 'GET',
    url: `${endpoint}/api/prueba/${username}/${password}/${userIp}`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (err) {
    return next(err)
  }
  res.end(`${JSON.stringify(result)}`)
})

api.get('/send/:message', (req, res, next) => {
  const { message } = req.params
  console.log(message)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cagalvangrajales@gmail.com',
      pass: 'macasu123fuckyou'
    }
  })

  var mailOptions = {
    from: 'ca@gmail.com',
    to: 'carlos13arturo09@gmail.com',
    subject: 'Sending Email using Node.js',
    text: message
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
  return res.end('aqui esta el home!')
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]-web/api.js: ')} ${err}`)
  console.error(err)
  process.exit(1)
}

module.exports = api
