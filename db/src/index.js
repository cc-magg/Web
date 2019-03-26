'use strict'

module.exports = async function (config) {
  const chalk = require('chalk')
  // const Sequelize = require('sequelize') deactived because we don't have realtions between tables YET.
  /* MODELS */
  const setupUserModel = require('./Models/UserModel')
  /* LIBRARIES */
  const setupDatabase = require('./libs/db')
  const setupUser = require('./libs/user')

  const sequelize = setupDatabase(config)
  const UserModel = setupUserModel(config)

  await sequelize.authenticate() // verificamos con una suma que la bd este conectada

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)
  function handleFatalError (err) {
    console.error(`${chalk.red('[fatal error]: db/index.js')} ${err.message}`)
    console.error(err)
    process.exit(1)
  }

  return {
    userServices: setupUser(UserModel)
  }
}
