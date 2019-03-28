'use strict'

const setupDB = require('../')
const config = require('../config')
const chalk = require('chalk')

async function prueba () {
  let response = null
  const { userServices } = await setupDB(config.configg).catch(handleFatalError)
  if (userServices && userServices != null) {
    /*response = await userServices.createOrUpdate(config.user)
    console.log('desde el example index 1 ' + JSON.stringify(response))*/

    /*response = await userServices.findone(config.user.uuid)
    if (response && response instanceof Error) {
      return handleError(response.message)
    }
    console.log('desde el example index 2 ' + JSON.stringify(response))*/

    response = await userServices.verifyuser(config.user.username, config.user.password)
    if (response && response instanceof Error) {
      return handleFatalError(response.message)
    }
    console.log('desde el example index 3 ' + JSON.stringify(response))
  }
}

function handleError (err) {
  console.error(`${chalk.red('No Fatal ERROR!')}: ${err}`)
  if (err.message) {
    console.error(err.mesage)
  }
}

function handleFatalError (err) {
  console.error(`${chalk.red('Fatal ERROR!')}: ${err}`)
  if (err.message) {
    console.error(err.mesage)
  }
  process.exit(1)
}

prueba()
