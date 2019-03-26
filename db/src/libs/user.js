'use strict'

module.exports = function setupUser (UserModel) { // Servicios del usuario
  function findall () {
    return UserModel.findAll()
  }

  async function createOrUpdate (agentToUpdateOrCreate) {
    const cond = { // condicion de la consulta y es un objeto sequelize
      where: {
        uuid: agentToUpdateOrCreate.uuid
      }
    }

    // .findOne es de sequelize por lo que tambien se tuvo que declarar en el archivo de pruebas
    const existingAgent = await UserModel.findOne(cond)
    console.log(`AAA-------------------------------------`)
    if (existingAgent) {
      const updated = await UserModel.update(agentToUpdateOrCreate, cond) // quiere decir actualiza el agente donde la condicion sea uuid == xxx
      console.log(`BBB------------${updated}-------------------------`)
      return updated ? UserModel.findOne(cond) : existingAgent
    }

    // de lo contrario, crea el agente
    console.log(`CCC-------------------------------------`)
    const result = await UserModel.create(agentToUpdateOrCreate)
    return result.toJSON()
  }

  return {
    findall,
    createOrUpdate
  }
}
