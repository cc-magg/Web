'use strict'

const jwt = require('jsonwebtoken')

module.exports = {
  sign: (payload, secret, callback) => {
    jwt.sign(payload, secret, callback)
  },
  verify: (payload, secret, callback) => {
    jwt.verify(payload, secret, callback)
  }
}
/* for create a token:
cd src
node
const auth = require('./auth');
const token = auth.sign({ username: 'WEB-server', admin: true }, 'APIsecretKey', console.log) */
