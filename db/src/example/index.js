'use strict'

const setupDB = require('../')
const config = require('../config')

async function prueba () {
  let response = null
  const { userServices } = await setupDB(config.configg).catch(handleFatalError)
  if (userServices && userServices != null) {
    response = await userServices.createOrUpdate(config.user)
    console.log('desde el example index 2 ' + JSON.stringify(response))
    response = await userServices.findall()
    console.log('desde el example index 2 ' + JSON.stringify(response))
  }
}

function handleFatalError (err) {
  console.error(err)
  console.error(err.mesage)
  process.exit(1)
}

prueba()
