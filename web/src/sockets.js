'use strict'
const Chat = require('./models/Chat')
const ObjectId = require("mongoose").Types.ObjectId
let users = []
this._userId = null

module.exports = function (io) {
  io.on('connection', async socket => {
    console.log('new user connected')
    let messages = await Chat.find({}).sort({ created_at: -1 }).limit(6)
    messages = messages.sort({ created_at: -1 })
    socket.emit('load old messages', messages)
    socket.emit('load users', users)

    socket.on('new user', function (userId) { // no va a entrar aca a menos que actualicemos el cliente, si reiniciamos el servidor solo reinicia las variables mas no se pierde la conexion con los clientes anteriores
      users.push(userId)
      console.log('newwwwww user: '+users)
      this._userId = userId
      io.sockets.emit('new user connected', userId)
    })

    socket.on('send message', async function (data) {
      const newMessage = new Chat({
        from: data.from,
        message: data.message
      })
      await newMessage.save()
      io.sockets.emit('new message', data)
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
      console.log(users+'--usuario desconectado: '+this._userId)
      //if (this._userId === null || this._userId === undefined) { // ocurre en caso de que se reinicie el servidor y algun cliente sigue conectado desde antes de que callera hasta que vuelve a prender, en ese caso el this._userId estaria vacio ya que primero se desconecta al usuario antiguo antes de conectar a el otro usuario sobre le mismo cliente
      const index = users.indexOf(this._userId)
      users.splice(index, 1)
      console.log(users)
      //}
      io.sockets.emit('user disconnected', users)
    })
  })
}

async function GettingMesages (messageId) {
  let messages = await Chat.find({ _id: {$lte: ObjectId(messageId)} }).sort({ created_at: -1 }).limit(7) // more here: https://stackoverflow.com/questions/21947625/return-range-of-documents-around-id-in-mongodb
  let newMessage = []
  for(let i = 0; i < messages.length; i++) {
    newMessage.push(messages[i])
  }
  newMessage.shift()
  return newMessage
}
