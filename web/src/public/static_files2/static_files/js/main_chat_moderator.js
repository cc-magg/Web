'use strict'
let userId = Math.random() * (10 - 1) + 1
let users = []
var newInterval = null

// Aqui ponemos jquery para no tener que usar react
$(function () {
  let socket = io() // IO is defined on the html
  console.log('id....' + userId)

  // obtenemos DOM elements de la interface
  const $messageForm = $('#message-form')
  const $messageBox = $('#message')
  const $chat = $('#chat')
  const $usersList = $('#usersList')
  const $roomsList = $('#roomsList')
  const $moreMessages = $('#moreMessages')
  const $betweenModerators = $('#betweenModerators')
  console.log(`My Id is: ${userId}`)
  let oldIdLoaded_FirstMessage = null
  let oldMinuteLoaded_FirstMessage = null
  let oldMinuteLoaded_LastMessage = null // minuto del ultimo mensaje cargado a inicio de pag
  let lastMinute = null // minuto del ultimo mensaje
  let rooms = []
  const moderatorRoom = `moderator_macasu.`
  userId = `moderator ${userId}`

  console.log('Connecting to the server+')
  newInterval = setInterval(intervalo2, 1000)

  let roomConnection = {
    userId,
    room: moderatorRoom,
    loadOldMessage: true
  }
  /*
  // EVENTS
  socket.emit('new user', userId)

  /* ROOMS EVENTS */
  /*let roomConnection = {
    userId,
    room: moderatorRoom,
    loadOldMessage: true
  }
  socket.emit('join room', roomConnection) // creamos la room: moderator userId y nos unimos a ella
  let newUserToRoom = {
    room: moderatorRoom, 
    users: [userId]
  }
  rooms.push(newUserToRoom) // guardamos la habitacion que acabamos de crear en la lista de habitaciones
  let getOldRooms = {
    toUser: userId,
    toRoom: moderatorRoom
  }
  socket.emit('get rooms', getOldRooms) // pedimos las habitaaciones que ya estaban creadas (junto con sus usuarios) antes de conectarnos*/
  socket.on('old rooms', function (oldRooms) { // 1) guardamos su room junto con su usuario y 2) nos subscrimos a su room
    if (oldRooms.toUser === userId) {
      oldRooms = oldRooms.rooms
      oldRooms.forEach(function (lookedRoom) {
        lookedRoom = lookedRoom.room
        const roomModerators = new RegExp('-', 'i')
        roomConnection = {
          userId,
          room: lookedRoom,
          loadOldMessage: true
        }
        if (!lookedRoom.match(/moderator/)) {
          console.log('ENTRO A PEDIR JOIN ROOOM!1 desde old rooms--'+JSON.stringify(lookedRoom))
          socket.emit('join room', roomConnection)
        } else if (lookedRoom.match(roomModerators)) { // si es una room de moderadores
          let usersOfRoom = lookedRoom.split('-')
          let thisModeratorExistsOnThisRoom = false
          usersOfRoom.forEach(function (userModerator) {
            if (userModerator === moderatorRoom) {
              thisModeratorExistsOnThisRoom = true
            }
          })
          if (thisModeratorExistsOnThisRoom == true) {
            console.log('ENTRO A PEDIR JOIN ROOOM!2 desde old rooms--'+JSON.stringify(lookedRoom))
            socket.emit('join room', roomConnection)
          }
        }
      })
    }
    // actualizamos la lista rooms de moderadores
    updateList()
  })

  socket.on('new room', function (payload) { // cuando un usuario se conecta: 1) verificamos: si es una rooms moderators y esta nuestra cuenta en ella, agregamos esta sesion 2) actualizamos la rooms lists
    rooms = payload.rooms
    const room = rooms[payload.roomIndex].room
    // Procedemos a verificar si yo (esta sesion de moderador) ya existe en la room que se creo/actualizo
    let alreadysubscribedOnRoom = false
    rooms[payload.roomIndex].users.forEach(function (userIteractor) {
      if (userIteractor == userId) {
        alreadysubscribedOnRoom = true
      }
    })
    if (alreadysubscribedOnRoom == false) { // si esta sesion de moderador no existe en la room que se creo/actualizo procedemos a verificar si debemos subscribirnos
      const roomModerators = new RegExp('-', 'i')
      roomConnection = {
        userId,
        room,
        loadOldMessage: true
      }
      if (!room.match(/moderator/)) { // si no es una room de moderador (osea si es una room de usuario) procedemos a subscribirnos
        console.log('ENTRO A PEDIR JOIN ROOOM!1--'+JSON.stringify(room))
        socket.emit('join room', roomConnection)
      } else if (room.match(roomModerators)) { // si mi room esta en  la nueva sala de moderadores me subscribo
        let usersOfRoom = room.split('-')
        let thisModeratorExistsOnThisRoom = false
        usersOfRoom.forEach(function (userModerator) {
          if (userModerator === moderatorRoom) {
            thisModeratorExistsOnThisRoom = true
          }
        })
        if (thisModeratorExistsOnThisRoom == true) {
          console.log('ENTRO A PEDIR JOIN ROOOM!2--'+JSON.stringify(room))
          socket.emit('join room', roomConnection)
        }
      }
    }
    updateList()
  })
  socket.on('new room message', function (payload) { // 1) actualizamos su room agregandole agregando el nuevo user 2) actualizamos la Room list
    console.log('nuevo mensaje en el canal: '+payload.message)
    rooms = payload.rooms
    updateList()
  })
  const updateList = function () {
    /* ACTUALIZAMOS LA LISTA DE ROOMS */
    $roomsList.empty()
    $roomsList.append('<h1 class="usersListHeader">Rooms</h1>')
    for ( let i = 0; i < rooms.length; i++) {
      const newreg = RegExp('-', 'i')
      if (!rooms[i].room.match(newreg) && rooms[i].users.length === 0) { // si es una cuenta(room) de usuario o moderador y no hay ninguna sesion
        $roomsList.append(`<p><span style="text-align: left; font-weight: 700; font-size: 20px;">Room: </span>${rooms[i].room}</p><p style="text-align: left; font-weight: 700; font-size: 20px;">Offline</p>`)
      } else if (rooms[i].room.match(newreg) && rooms[i].users.length === 0) { // si es una room de moderators y no hay ninguna sesion online
        $roomsList.append(`<p><span style="text-align: left; font-weight: 700; font-size: 20px;">Room: </span>${rooms[i].room}</p><p style="text-align: left; font-weight: 700; font-size: 20px;">Users: Offline</p>`)
      } else { // si existen sesiones
        $roomsList.append(`<p><span style="text-align: left; font-weight: 700; font-size: 20px;">Room: </span>${rooms[i].room}</p><p style="text-align: left; font-weight: 700; font-size: 20px;">Users:</p>`)
        rooms[i].users.forEach(function (userID) {
          if (userID === userId) {
            $roomsList.append(`<p style="text-align: left;">Me: ${userID}</p>`)
          } else {
            $roomsList.append(`<p style="text-align: left;">${userID}</p>`)
          }
        })
      }
    }
  }
  /*///////////////////////////////////////////////////////////*/

  // cargamos los usuarios que ya estaban conectados
  socket.on('load users', function (users) {
    $usersList.empty()
    $usersList.append('<h1 class="usersListHeader">Users Online</h1>')
    for( let i = 0; i < users.length; i++) {
      if (users[i] === userId) {
        $usersList.append(`<p>My id: ${users[i]}</p>`)
      } else{
      $usersList.append(`<p>${users[i]}</p>`)}
    }
  })

  // cargamos mensajes viejos
  socket.on('load old messages', function (payload) {
    const messages = payload.roomMessages
    const to = payload.to
    if (to === String(userId)) { // verificamos que la recarga de mensjaes anteriores que mando el servidor la haya pedido este cliente
      $chat.empty()
      let day = null
      for (let i = 0; i < messages.length; i++) {
        const message_date = messages[i].created_at
        const Year = message_date.substr(0, 4) // "2019-02-27T19:45:39.918Z"
        const Month = message_date.substr(5, 2)
        const Day = message_date.substr(8, 2)
        const Hour = message_date.substr(11, 2)
        const Minute = message_date.substr(14, 2)
        const Second = message_date.substr(17, 2)

        if (i === messages.length - 1) {
          oldMinuteLoaded_LastMessage = Day
        }

        if ( i === 0) {
          oldIdLoaded_FirstMessage = messages[i]._id
          oldMinuteLoaded_FirstMessage = Day
        }

        // console.log(`${Year}:${Month}:${Day}:${Hour}:${Minute}:${Second}`)
        if (!day) {
          day = Day
          $chat.append(`<hr><div  id="Minuto" style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${Day}</div>`)
          // console.log( Minute + '--First message and day registrated ' + messages[i].message)
        } else if (day !== Day) { // day=59  minute= 49
          $chat.append(`<hr><div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${Day}</div><br/>`)
          // console.log( 'day: '+day+'-- Minute: '+Minute + '--new day ' + messages[i].message)
          day = Day
        } else if (day === Day) {
          // console.log( 'day: '+day+'-- Minute: '+Minute + '--Same day ' + messages[i].message)
        }
        if (messages[i].room === 'All') {
          if (messages[i].from == userId) {
            $chat.append(`<span style="font-weight: 700; color: #ff5400;">To ${messages[i].room}:</span> ${messages[i].message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${messages[i].from}</span><br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
          } else {
            $chat.append(`<span style="font-weight: 700; color: #ff5400;">${messages[i].room}:</span> ${messages[i].message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${messages[i].from}</span><br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
          }
        } else {
          $chat.append(`<span style="font-weight: 700; color: #ff8f00;">${messages[i].from}:</span> ${messages[i].message}<br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
        }
        if (messages[i + 1]) {
          const nextMinute = messages[i + 1].created_at.substr( 8, 2 )
          if (nextMinute !== Day) {
            $chat.append(`<div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${Day}</div>`)
          }
        }
      }
    }
  })

  // recibe nuevo usuario conectado
  socket.on('new user connected', function (usersListArray) {
    $usersList.empty()
    users = usersListArray
    $usersList.append('<h1 class="usersListHeader">Users Online</h1>')
    usersListArray.forEach( function (user) {
      if (userId === user) {
        $usersList.append(`<p>My id: ${userId}</p>`)
      } else {
        $usersList.append(`<p>${user}</p>`)
      }
    })
  })

  // enviando mensaje
  $messageForm.submit(event => {
    event.preventDefault() // previene el refrescado de pagina cada que damos clic al boton submit
    // verificamos que el mensaje sea tenga un comando
    let data = {}
    if ($messageBox.val().substring(0, 1) == '/') {
      const decryptedCommand = decryptCommand($messageBox.val())
      // envia whisper
      if (decryptedCommand.command == '/w') {
        console.log('enviando datos')
        data = {
          from: userId,
          to: decryptedCommand.name,
          message: decryptedCommand.message
        }
        socket.emit('whisper', data)
        // socket.emit('join room', data.to)
        $messageBox.val('')
      } else if (decryptedCommand.command == '/R') { // envia mensaje a una room
        console.log('enviando datos con command: /R')
        data = {
          from: moderatorRoom,
          message: decryptedCommand.message,
          room: decryptedCommand.name
        }
        socket.emit('send message', data)
        $messageBox.val('')
      }
    } else {
      console.log('enviando datos')
      data = {
        from: moderatorRoom,
        message: `${$messageBox.val()}`,
        room: 'All'
      }
      socket.emit('send moderator message', data)
      $messageBox.val('')
    }
  })
  const decryptCommand = function (messageWithCommand) {
    let indexof = messageWithCommand.indexOf(' ')
    const command = messageWithCommand.substr(0, indexof) // "/w"

    let temporal = messageWithCommand.substr(parseInt(indexof) + 1, $messageBox.val().length) // "name message"
    indexof = temporal.indexOf(' ')

    const name = temporal.substr(0, indexof) // "name"
    const message = temporal.substr(parseInt(indexof) + 1, temporal.length) // "message"
    return { command, name, message }
  }

  // recive whisper
  socket.on('new whisper', function (data) {
    if (data.to == userId) {
      const messageDate = Line()
      $chat.append(`<span style="font-weight: 700; color: #ff95ce;">${data.from}:</span> ${data.message}<br/><span class="messageDate">${messageDate}</span></br>`)
    } 
    if (data.from == userId) {
      const messageDate = Line()
      $chat.append(`<span style="font-weight: 700; color: #ff95ce;">To ${data.to}:</span> ${data.message}<br/><span class="messageDate">${messageDate}</span></br>`)
    }
  })

  // recive nuevos mensajes
  socket.on('new message', function (data) {
    const messageDate = Line()
    if (data.room === 'All') {
      if (data.from == userId) {
        $chat.append(`<span style="font-weight: 700; color: #ff5400;">To ${data.room}:</span> ${data.message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${data.from}</span><br/><span class="messageDate">${messageDate}</span></br>`)
      } else {
        $chat.append(`<span style="font-weight: 700; color: #ff5400;">${data.room}:</span> ${data.message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${data.from}</span><br/><span class="messageDate">${messageDate}</span></br>`)
      }
    } else {
      if (data.from == userId) {
        $chat.append(`<span style="font-weight: 700; color: #ff8f00;">To ${data.room}:</span> ${data.message}<br/><span class="messageDate">${messageDate}</span></br>`)
      } else {
        $chat.append(`<span style="font-weight: 700; color: #ff8f00;">${data.from}:</span> ${data.message}<br/><span class="messageDate">${messageDate}</span></br>`)
      }
    }
  })

  const Line = function () { // aqui se calcula y pone las lineas y tiempos que separan los mensajes nuevos en el chat (No los antiguos, solo los nuevos)
    let messageDate = new Date()
    const minute = messageDate.getMinutes()
    const day = messageDate.getDate()
    messageDate = messageDate.getHours() + ':' + messageDate.getMinutes()

    // console.log(messageDate.getDate()+'-'+messageDate.getHours()+':'+messageDate.getMinutes())
    if (!lastMinute) { // si no se ha enviado ningun mensaje compero con el ultimo mensaje cargado al iniciar la pag
      lastMinute = day
      if (oldMinuteLoaded_LastMessage != day) {
        $chat.append(`<div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${oldMinuteLoaded_LastMessage}:</div><hr><div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${day}</div>`)
      }
    } else if (lastMinute != day) {
      $chat.append(`<div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${lastMinute}:</div><hr><div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${day}</div>`)
      lastMinute = day
    }
    return messageDate
  }

  $moreMessages.click(function () {
    // separamos las rooms a las que estamos subscritos
    /*let subscribedRooms = []
    for (const iterator of rooms) {
      iterator.users.forEach((user) => {
        if (user === userId) {
          subscribedRooms.push(iterator.room)
        }
      })
    }*/
    console.log('asked for new messages?')
    const data = {
      messageId: oldIdLoaded_FirstMessage,
      userId,
      room: moderatorRoom
    }
    socket.emit('ChargeMoreMessages', data)
  })
  $betweenModerators.click(function () {
    console.log('asked for new room between moderators?')
    let moderatorsRoomAlreadyExists = false
    let howManyOtherRoomsExists = 0
    let newRoom = `${moderatorRoom}`
    for (const iterator of rooms) {
      // verifico si existen mas salas de otros moderadores para poder unirlas
      const numberOfModerators = new RegExp ('-', 'g')
      if (iterator.room !== moderatorRoom && iterator.room.match(/moderator/) && iterator.room.match(numberOfModerators) === null) {
        newRoom += `-${iterator.room}`
        howManyOtherRoomsExists++
      }
    }
    if (howManyOtherRoomsExists > 0) {
      for (const iterator of rooms) {
        let firstModeratorSame = false
        let secondModeratorSame = false
        // verifico si no existe ya una sala con los moderadores creada
        const numberOfModerators = new RegExp ('-', 'g')
        if (iterator.room.match(numberOfModerators)) { // si encuentra que es una room de moderadores
          if (iterator.room.match(numberOfModerators).length === 1) { // si la room entre moderadores es de 2
            const moderators = iterator.room.split('-')
            moderators.forEach(function (roomUser) {
              if (roomUser === moderatorRoom) {
                firstModeratorSame = true
              } else if (roomUser === 'moderator_macasu2.') { // normalmente el moderador 2 debe ser enviado al presionar el boton "Hablar a X moderador", entonces moderador X seria 'moderator_macasu2.'
                secondModeratorSame = true
              }
            })
          }
        }
        if (firstModeratorSame == true && secondModeratorSame == true) { // si ya existe una moderator room entre los dos moderatos
          moderatorsRoomAlreadyExists = true
          console.log('There is another room with the same 2 users already existing')
        }
      }
      if (moderatorsRoomAlreadyExists == false) {
        const roomConnection = {
          userId,
          room: newRoom,
          loadOldMessage: false
        }
        socket.emit('join room', roomConnection) // creamos la room: moderator userId y nos unimos a ella
        let newUserToRoom = {
          room: newRoom, 
          users: [userId]
        }
        rooms.push(newUserToRoom) // guardamos la habitacion que acabamos de crear en la lista de habitaciones
      }       
    } else {
      console.log('there are not enough moderator rooms')
    }
  })

  // cargamos mensajes viejos
  socket.on('load More messages', function (newData) {
    const { messages, toUserId } = newData
    if (userId == toUserId) {
      //let element = document.getElementById("#chat");
      $chat.remove("#Minuto")
      let day = null
      for (let i = 0; i < messages.length; i++) {
        const message_date = messages[i].created_at
        const Year = message_date.substr(0, 4) // "2019-02-27T19:45:39.918Z"
        const Month = message_date.substr(5, 2)
        const Day = message_date.substr(8, 2)
        const Hour = message_date.substr(11, 2)
        const Minute = message_date.substr(14, 2)
        const Second = message_date.substr(17, 2)

        if (i === messages.length - 1) {
          oldMinuteLoaded_FirstMessage = Day
          oldIdLoaded_FirstMessage = messages[i]._id
        }

        if (i === 0) {
          if (oldMinuteLoaded_FirstMessage !== Day) {
            $chat.prepend(`<div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${Day}:</div><hr><div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${oldMinuteLoaded_FirstMessage}</div>`)
          }
          oldMinuteLoaded_FirstMessage = Day
          day = Day
        } else if (day !== Day) {
          $chat.prepend(`<div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${Day}:</div><hr><div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${day}</div>`)
          // console.log( 'day: '+day+'-- Minute: '+Minute + '--new day ' + messages[i].message)
          day = Day
        } else if (day === Day) {
          // console.log( 'day: '+day+'-- Minute: '+Minute + '--Same day ' + messages[i].message)
        }
        if (messages[i].room === 'All') {
          if (messages[i].from == userId) {
            $chat.prepend(`<span style="font-weight: 700; color: #ff5400;">To ${messages[i].room}:</span> ${messages[i].message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${messages[i].from}</span><br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
          } else {
            $chat.prepend(`<span style="font-weight: 700; color: #ff5400;">${messages[i].room}:</span> ${messages[i].message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${messages[i].from}</span><br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
          }
        } else {
          $chat.prepend(`<span style="font-weight: 700; color: #ff8f00;">${messages[i].from}:</span> ${messages[i].message}<br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
        }
      }
    }
  })

  // recive lista con los usuarios renovada
  socket.on('user-moderator disconnected', function (payload) {
    rooms = payload.list
    // actualizamos la lista de usuarios y moderadores
    console.log('users:-----'+users+'--'+payload.users)
    users = payload.users
    console.log('users:-----'+users+'--'+payload.users)
    $usersList.empty()
    $usersList.append('<h1 class="usersListHeader">Users Online</h1>')
    for( let i = 0; i < users.length; i++) {
      if (users[i] === userId) {
        $usersList.append(`<p>My id: ${users[i]}</p>`)
      } else{
      $usersList.append(`<p>${users[i]}</p>`)}
    }
    // actualizamos la lista rooms de moderadores
    updateList()
  })

  function intervalo2 () {
    socket.emit('custom ping', userId)
  }

  socket.on('reconnect', function (number) { // (evento de socket.io o socket mas info aqui: https://stackoverflow.com/questions/24224287/list-of-socket-io-events) por si se apaga el servidor y un usuario ya tenia un chat abierto, que no tenga que actualizar la vista cuando vuelva el servidor para seguir chateando
    console.log('Reconnected+'+number)
    newInterval = setInterval(intervalo2, 1000)
  })
  socket.on('custom pong', function (to) {
    if (to === userId) {
      console.log('The server is listening the events!')
      clearInterval(newInterval)
      rooms = []
      users = []
      roomConnection = {
        userId,
        room: moderatorRoom,
        loadOldMessage: true
      }
      let newUserToRoom = {
        room: moderatorRoom, 
        users: [userId]
      }
      let getOldRooms = {
        toUser: userId,
        toRoom: moderatorRoom
      }
      rooms.push(newUserToRoom) // guardamos la habitacion que acabamos de crear en la lista de habitaciones
      socket.emit('new user', userId)
  
      socket.emit('join room', roomConnection)
  
      socket.emit('get rooms', getOldRooms)
    }
  })
})
