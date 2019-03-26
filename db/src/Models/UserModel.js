'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)// verificamos que este la conexion a la bd y si no lo esta la crea

  // Ahora creamos la tabla 'agent' junto con sus columnas con Sequelize
  return sequelize.define('user', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
