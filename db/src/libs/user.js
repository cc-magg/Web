'use strict'
const chalk = require('chalk')

module.exports = function setupUser (UserModel) { // Servicios del usuario
  function findall () {
    return UserModel.findAll()
  }

  async function findone (cond) { // errors of typing code that are not in a 'try' goes to ../index.js
    console.log(cond+' -- '+typeof(cond))
    let resoult = null
    try {
      resoult = await UserModel.findOne(cond)
    }  catch (err) { // if the sequelize return an error, the error goes here (if the error inside the try is a typing error it goes to ../index.js)
      console.log(`${chalk.red('ERROR!')} from the ${chalk.red('service')} "findone" of user: ${err}`)
      return new Error(err)
    }
    if (!resoult) { // if the user doesn't exist
      return { message: 'The search did not bear fruit.', resoult: { founded: false } }
    }
    return { message: 'The search paid off.', resoult: { founded: true, resoult } }
  }

  async function createOrUpdate (newuser) {
    /* 1---------- we look if if already exists */
    /* we use the service findone */
    const findoneResoult = await findone({ where: { uuid: newuser.uuid } })
    if (findoneResoult && findoneResoult instanceof Error) {
      console.log(`${chalk.red('ERROR!')} from the ${chalk.red('service')} "findone" when it is ${chalk.red('used by the service')} "createOrUpdate": ${err}`)
      return new Error(findoneResoult)
    }
    ///////////////////////////////////
    /* 2---------- if it doesn't exists we create it */
    if (findoneResoult && findoneResoult.resoult.founded == false) {
      let createResoult = null
      try {
        createResoult = await UserModel.create(newuser)
      }  catch (err) { // if the sequelize return an error, the error goes here (if the error inside the try is a typing error it goes to ../index.js)
        console.log(`${chalk.red('ERROR!')} from the ${chalk.red('service')} "createOrUpdate-create" of user: ${err}`)
        return new Error(err)
      }
      if (!createResoult) { // if the user doesn't exist
        return { message: 'The creation did not worked', resoult: newuser }
      }
      return { message: 'The creation worked well.', resoult: createResoult}
    }

    /* 3---------- if it exists we update it */
    const cond = { // condicion de la consulta y es un objeto sequelize
      where: {
        uuid: newuser.uuid
      }
    }
    let updated
    try {
      updated = await UserModel.update(newuser, cond)
    }  catch (err) { // if the sequelize return an error, the error goes here (if the error inside the try is a typing error it goes to ../index.js)
      console.log(`${chalk.red('ERROR!')} from the ${chalk.red('service')} "CreateOrUpdate-update" of user: ${err}`)
      return new Error(err)
    }
    if (updated == false) { // if the user doesn't exist
      return { message: 'Already exists and it couldt be updated', resoult: newuser }
    }
    /* we use the service findone */
    const findoneResoultNew = await findone({ where: { uuid: newuser.uuid } })
    if (findoneResoultNew && findoneResoultNew instanceof Error) {
      console.log(`${chalk.red('ERROR!')} from the ${chalk.red('service')} "findone" when it is ${chalk.red('used by the service')} "createOrUpdate" by second time: ${err}`)
      return new Error(findoneResoultNew)
    }
    if (findoneResoultNew && findoneResoultNew.resoult.founded == false) {
      return findoneResoultNew
    }
    ///////////////////////////////////
    return { message: 'Already exists but it was updated', resoult: { from: findoneResoult.resoult.resoult, to: findoneResoultNew.resoult.resoult } }
  }

  async function verifyuser (username, password) { // errors of typing code that are not in a 'try' goes to ../index.js
    /* we use the service findone */
    const findoneResoult = await findone({ where: { username: username } })
    if (findoneResoult && findoneResoult instanceof Error) {
      console.log(`${chalk.red('ERROR!')} from the ${chalk.red('service')} "findone" when it is ${chalk.red('used by the service')} "verifyuser" by second time: ${err}`)
      return new Error(findoneResoult)
    }
    ///////////////////////////////////
    if (findoneResoult && findoneResoult.resoult.founded == false) {
      console.log(`${chalk.red('WRONG USERNAME!')} for the user ${chalk.green(username)}`)
      return { message: 'Incorrect credentials', resoult: { access: false } }
    }
    if (password !== findoneResoult.resoult.resoult.password) {
      console.log(`${chalk.red('WRONG PASSWORD!')} for the user ${chalk.green(username)}`)
      return { message: 'Incorrect credentials', resoult: { access: false } }
    }
    return { message: 'correct credentials', resoult: { access: true } }
  }

  return {
    findall,
    findone,
    createOrUpdate,
    verifyuser
  }
}
