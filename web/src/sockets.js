'use strict'
const Chat = require('./models/Chat')
const ObjectId = require('mongoose').Types.ObjectId
let users = []
this._userId = null
let rooms = []
let moderators = []

module.exports = function (io) {
  io.on('connection', async socket => {
    console.log('new user connected')
    let messages = await Chat.find({}).sort({ created_at: -1 }).limit(6)
    messages = messages.sort({ created_at: -1 })
    // socket.emit('load old messages', messages)
    socket.emit('load users', users)

    socket.on('new user', function (userId) { // no va a entrar aca a menos que actualicemos el cliente, si reiniciamos el servidor solo reinicia las variables mas no se pierde la conexion con los clientes anteriores
      users.push(userId)
      console.log('newwwwww user: ' + users)
      this._userId = userId
      io.sockets.emit('new user connected', userId)
    })

    socket.on('get rooms', function (moderatorRoom) {
      io.to(moderatorRoom).emit('old rooms', rooms)
    })
    const loadRoom = async function (room, userId) {
      console.log('loading room: '+room)
      let roomMessages = await Chat.find({ room }).sort({ created_at: -1 }).limit(6)
      console.log('loading room--'+roomMessages)
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
      } else if (roomAlreadyExists == true) {
        let userAlreadyExists = false
        rooms[roomIndex].users.forEach(function (lookedUser) {
          if (lookedUser === user) {
            userAlreadyExists = true
          }
        })
        if (userAlreadyExists == false) {
          rooms[roomIndex].users.push(user)
        }
      }
      socket.join(room)
      let payload = {}
      console.log('AAAAAAAAAAAAAA-----------------------')
      if (room.match(/moderator/)) {
        console.log('AAAAAAAAAAAAAAB-----------------------')
        moderators.push(room)
        payload = {
          room,
          user,
          message: `new user: ${user} connected to the ${room} room`
        }
        io.to(room).emit('new room message', payload)
      } else if (!room.match(/moderator/) && !user.match(/moderator/)) { // cuando un usuario se conecta a su room
        console.log('AAAAAAAAAAAAAAC-----------------------')
        moderators.forEach(element => { // notificamos a todos los moderadores que se ha conectado un usuario
          payload = {
            room,
            user,
            message: `new user: ${user} connected to the ${room} room`
          }
          io.to(element).emit('new room', payload) // le mandamos a los moderadores que guarden en sus listas que un usuario se ha conectado y a que se conecten con el
        })
        loadRoom(room, user) // pedimos que al usuario le cargen los mensajes anteriores de la room
      } else if (!room.match(/moderator/) && user.match(/moderator/)) { // cuando un moderador se conecta a un room usuario
        console.log('AAAAAAAAAAAAAD-----------------------'+loadOldMessage+'--'+typeof(loadOldMessage)+'-------'+JSON.stringify(room))
        for (const iterator of room) {
          console.log('DDDDDDDDDDDDDDDDD--'+JSON.stringify(iterator))
        }
        payload = {
          room,
          user,
          message: `new user: ${user} connected to the ${room} room`
        }
        io.to(room).emit('new room message', payload)
        if (loadOldMessage == 'true') { // esto puede llegar a pasar en caso de que un usuario tenga varios dispositivos conectados con una cuenta, entonces cada dispositivo haria que el(los) moderador(es) cargan varias veces este evento (1ves por cada dispositivo)
          loadRoom(room, user) // pedimos que al moderador le cargen los mensajes anteriores de la room
        }
      }
    })
    socket.on('send moderator message', function (data) {
      io.sockets.emit('new message', data)
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
      const messages = await GettingMesages(data.messageId)
      const newData = {
        messages,
        toUserId: data.userId
      }
      io.sockets.emit('load More messages', newData)
    })

    socket.on('disconnect', function (data) {
      console.log(users + '--usuario desconectado: ' + this._userId)
      // if (this._userId === null || this._userId === undefined) { // ocurre en caso de que se reinicie el servidor y algun cliente sigue conectado desde antes de que callera hasta que vuelve a prender, en ese caso el this._userId estaria vacio ya que primero se desconecta al usuario antiguo antes de conectar a el otro usuario sobre le mismo cliente
      const index = users.indexOf(this._userId)
      users.splice(index, 1)
      console.log(users)
      // }
      io.sockets.emit('user disconnected', users)
    })
  })
}

async function GettingMesages (messageId) {
  let messages = await Chat.find({ _id: {$lte: ObjectId(messageId)} }).sort({ created_at: -1 }).limit(7) // more here: https://stackoverflow.com/questions/21947625/return-range-of-documents-around-id-in-mongodb
  let newMessage = []
  for (let i = 0; i < messages.length; i++) {
    newMessage.push(messages[i])
  }
  newMessage.shift()
  return newMessage
}
