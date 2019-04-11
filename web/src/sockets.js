'use strict'
const Chat = require('./models/Chat')
const chalk = require('chalk')
const ObjectId = require('mongoose').Types.ObjectId
let users = []
let rooms = []
let moderatorsRooms = []
this._userId = ''

module.exports = function (io) {
  io.on('connection', async socket => {
    console.log('new user connected')
    let messages = await Chat.find({}).sort({ created_at: -1 }).limit(6)
    messages = messages.sort({ created_at: -1 })
    // socket.emit('load old messages', messages)

    socket.on('new user', function (userId) { // no va a entrar aca a menos que actualicemos el cliente, si reiniciamos el servidor solo reinicia las variables mas no se pierde la conexion con los clientes anteriores
      this._userId = userId
      console.log(`${chalk.yellow(`new session asked for be added: ${userId}`)} old usersLists: ${users}`)
      if (!users.includes(userId)) {
        users.push(userId)
        console.log(`${chalk.green(`new session added: ${userId}`)} new usersLists: ${users}`)
        io.sockets.emit('new user connected', users)
      }
    })

    socket.emit('load users', users)

    socket.on('get rooms', function (moderatorRoom) {
      console.log(`${chalk.red(`the session ${moderatorRoom.toUser} of the room ${moderatorRoom.toRoom} asked for all the old rooms and we send to it: `)} ${JSON.stringify(rooms)}`)
      const oldRooms = {
        toUser: moderatorRoom.toUser,
        rooms
      }
      io.to(moderatorRoom.toRoom).emit('old rooms', oldRooms)
    })
    const loadRoom = async function (room, userId) {
      // console.log('loading room: '+room+'--To: '+userId)
      let roomMessages = null
      if (userId.match(/moderator/)) { // si es para un moderador buscamos en que rooms esta subscrito
        let moderatorRooms = []
        for (const iterator of rooms) {
          iterator.users.forEach((user) => {
            if (user === userId) {
              moderatorRooms.push({room: iterator.room})
            }
          })
        }
        moderatorRooms.push({room: 'All'})
        roomMessages = await Chat.find({ $or: moderatorRooms }).sort({ created_at: -1 }).limit(6)
      } else {
        roomMessages = await Chat.find({ $or: [ {room}, {room: 'All'}] }).sort({ created_at: -1 }).limit(6)
      }
      roomMessages = roomMessages.sort({ created_at: -1 })
      const payload = {
        to: userId,
        roomMessages
      }
      io.to(room).emit('load old messages', payload)
    }
    socket.on('join room', function (roomConnection) {
      const room = String(roomConnection.room)
      const user = String(roomConnection.userId)
      const loadOldMessage = String(roomConnection.loadOldMessage)
      let roomAlreadyExists = false
      let roomIndex = null
      let userAlreadyExists = false
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].room === room) {
          roomAlreadyExists = true
          roomIndex = i
          break
        }
      }
      if (roomAlreadyExists == false) { // si no existe en nuestra lista, procedemos a agregar el room a nuestra lista y nos suscribimos a e¡dicha room
        let newUserToRoom = {
          room,
          users: []
        }
        newUserToRoom.users.push(user)
        rooms.push(newUserToRoom)
        roomIndex = rooms.length-1
        socket.join(room) // si la room no existe entonces la crea y subscribe la nueva sesion a ella
      } else if (roomAlreadyExists == true) {
        rooms[roomIndex].users.forEach(function (lookedUser) {
          if (lookedUser === user) {
            userAlreadyExists = true
          }
        })
        if (userAlreadyExists == false) {
          rooms[roomIndex].users.push(user)
          socket.join(room) // si la room ya existe pero el usuario no esta en ella, entonces lo subscribe
        }
      }
      console.log(`${chalk.cyan('rooms updated: ')} ${JSON.stringify(rooms)} ${chalk.cyan('-- new user:')} ${chalk.bgGreen(user)} ${chalk.cyan('-- to the room:')} ${chalk.bgGreen(room)}`)
      let payload = {}
      if (room.match(/moderator/) && roomAlreadyExists == false) { // cuando una sesion moderator se subscribe a una room moderador nueva
        console.log(`${chalk.blue('a moderator joined to his own room')} with the userId: ${user}`)
        moderatorsRooms.push(room)
        moderatorsRooms.forEach(element => { // notificamos a todos los moderadores que se ha conectado una nueva moderator room
          payload = {
            rooms,
            roomIndex,
            message: `new user: ${user} connected to the ${room} room`
          }
          io.to(element).emit('new room', payload) // le pasamos a cada room de moderador (a todas las sesiones que esten subscritas a esa room) la nueva moderator room creada y a que actulice la lista del frontend
        })
        loadRoom(room, user) // pedimos que al moderador le cargen los mensajes anteriores de la room
      } else if (room.match(/moderator/) && roomAlreadyExists == true && userAlreadyExists == false) { // cuando una nueva sesion moderator se subscribe a su room
        console.log(`${chalk.blue('a moderator joined to a moderator room!')} with the userId: ${user}`)
        moderatorsRooms.forEach(element => { // notificamos a todos los moderadores que una nueva sesion de moderador se ha conectado a una moderator room
          payload = {
            rooms,
            roomIndex,
            message: `new user: ${user} connected to the ${room} room`
          }
          io.to(element).emit('new room', payload) // le pasamos a cada room de moderador (a todas las sesiones que esten subscritas a esa room) la nueva moderator room creada y a que actulice la lista del frontend
        })
        loadRoom(room, user) // pedimos que al moderador le cargen los mensajes anteriores de la room
      } else if (!room.match(/moderator/) && !user.match(/moderator/)) { // cuando un usuario se conecta a su room
        console.log(`${chalk.blue('a user joined to his own room')} with the userId: ${user}`)
        moderatorsRooms.forEach(element => { // notificamos a todos los moderadores que se ha conectado un usuario
          payload = {
            rooms,
            roomIndex,
            message: `new user: ${user} connected to the ${room} room`
          }
          io.to(element).emit('new room', payload) // le mandamos a los moderadores que guarden en sus listas que un usuario se ha conectado y a que se conecten con el
        })
        loadRoom(room, user) // pedimos que al usuario le cargen los mensajes anteriores de la room
      } else if (!room.match(/moderator/) && user.match(/moderator/)) { // cuando un moderador se conecta a un room usuario
        console.log(`${chalk.blue('a moderator joined to an user room')} with the userId: ${user}`)
        payload = {
          rooms,
          message: `from room ${room}: new user: ${user} connected to the room`
        }
        io.to(room).emit('new room message', payload)
        if (loadOldMessage == 'true') { // esto puede llegar a pasar en caso de que un usuario tenga varios dispositivos conectados con una cuenta, entonces cada dispositivo haria que el(los) moderador(es) cargan varias veces este evento (1ves por cada dispositivo)
          loadRoom(room, user) // pedimos que al moderador le cargen los mensajes anteriores de la room
        }
      }
    })
    socket.on('send moderator message', async function (data) {
      const newMessage = new Chat({
        from: data.from,
        message: data.message,
        room: data.room
      })
      io.sockets.emit('new message', data)
      await newMessage.save()
    })

    socket.on('send message', async function (data) {
      const newMessage = new Chat({
        from: data.from,
        message: data.message,
        room: data.room
      })
      io.to(data.room).emit('new message', data)
      await newMessage.save()
    })

    socket.on('whisper', function (data) {
      io.sockets.emit('new whisper', data) // data = {username, message}
    })

    socket.on('ChargeMoreMessages', async function (data) {
      const messages = await GettingMesages(data.messageId, data.userId, data.room)
      const newData = {
        messages,
        toUserId: data.userId
      }
      io.sockets.emit('load More messages', newData)
    })

    socket.on('custom ping', function (data) {
      io.sockets.emit('custom pong', data)
    })

    socket.on('disconnect', function () {
      const userDisconnected = this._userId
      // REMOVEMOS DE LA LISTA ROOMS DE MODERADORES
      console.log(`${chalk.yellow('a session was disconnected!')} with the userId: ${chalk.bgMagenta(userDisconnected)}`)
      for ( let j = 0; j < rooms.length; j++) {
        for ( let i = 0; i < rooms[j].users.length; i++) {
          if (rooms[j].users[i] === String(userDisconnected)) {
            rooms[j].users.splice(i, 1)
            console.log(`${chalk.blue('from the room:')} ${chalk.bgMagenta(rooms[j].room)}`)
          }
        }
      }
      
      // REMOVEMOS DE LA LISTA 'USERS' DE LOS USUARIOS al que hizo logout
      const index = users.indexOf(userDisconnected)
      users.splice(index, 1)
      let disconnected = null
      // ACTUALIZAMOS AMBAS LISTAS (ROOMS de moderadores y USERS de usuarios y moderadores)
      disconnected = {
        list: rooms,
        users
      }
      moderatorsRooms.forEach(element => { // notificamos a todos los moderadores que se ha conectado una nueva moderator room
        io.to(element).emit('user-moderator disconnected', disconnected) // le pasamos a cada room de moderador (a todas las sesiones que esten subscritas a esa room) la nueva moderator room creada y a que actulice la lista del frontend
      })
      disconnected = {
        users
      }
      io.sockets.emit('user list update', disconnected)
    })
  })
}

async function GettingMesages (messageId, userId, room) {
  let messages = null
  if (String(userId).match(/moderator/)) {
    let moderatorRooms = []
    for (const iterator of rooms) {
      iterator.users.forEach((user) => {
        if (user === userId) {
          moderatorRooms.push({room: iterator.room})
        }
      })
    }
    moderatorRooms.push({room: 'All'})
    messages = await Chat.find({ $and: [ {$or: moderatorRooms}, {_id: {$lte: ObjectId(messageId)}} ] }).sort({ created_at: -1 }).limit(7) // more here: https://stackoverflow.com/questions/21947625/return-range-of-documents-around-id-in-mongodb
    /*let moderatorRooms = []
    for (const iterator of room) {
      moderatorRooms.push({room: iterator.room})
    }
    moderatorRooms.push({room: 'All'})
    messages = await Chat.find({ $and: [ {$or: moderatorRooms}, {_id: {$lte: ObjectId(messageId)}} ] }).sort({ created_at: -1 }).limit(7) // more here: https://stackoverflow.com/questions/21947625/return-range-of-documents-around-id-in-mongodb*/
  } else {
    messages = await Chat.find({ $and: [ {$or: [{room},{room: 'All'}]}, {_id: {$lte: ObjectId(messageId)}} ] }).sort({ created_at: -1 }).limit(7) // more here: https://stackoverflow.com/questions/21947625/return-range-of-documents-around-id-in-mongodb
  }
  let newMessage = []
  for (let i = 0; i < messages.length; i++) {
    newMessage.push(messages[i])
  }
  newMessage.shift()
  return newMessage
}
