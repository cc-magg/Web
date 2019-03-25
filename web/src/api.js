'use strict'

const express = require('express')
const chalk = require('chalk')
const nodemailer = require('nodemailer')
const api = express.Router()

api.get('/', (req, res, next) => {
  return res.send('estamos online!!')
})

api.get('/prueba', (req, res, next) => {
  return res.send('estamos online!!')
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
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
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
