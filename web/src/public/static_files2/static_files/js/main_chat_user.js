'use strict'
const userId = Math.random() * (10 - 1) + 1
// const userId = 'someUser2'
const room = 'someUser2'
let users = []
var newInterval = null

// Aqui ponemos jquery para no tener que usar react
$(function () {
  const socket = io() // IO is defined on the html

  console.log('id....' + userId)

  // obtenemos DOM elements de la interface
  const $messageForm = $('#message-form')
  const $messageBox = $('#message')
  const $chat = $('#chat')
  const $usersList = $('#usersList')
  const $moreMessages = $('#moreMessages')
  console.log(`My Id is: ${userId}`)
  let oldIdLoaded_FirstMessage = null
  let oldMinuteLoaded_FirstMessage = null
  let oldMinuteLoaded_LastMessage = null // minuto del ultimo mensaje cargado a inicio de pag
  let lastMinute = null // minuto del ultimo mensaje

  console.log('Connecting to the server+')
  newInterval = setInterval(intervalo2, 1000)
  let roomConnection = {
    userId,
    room,
    loadOldMessage: true
  }

  // EVENTS
  //socket.emit('new user', userId)

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

  /*const roomConnection = {
    userId,
    room,
    loadOldMessage: true
  }
  socket.emit('join room', roomConnection) // creamos nuestra room y nos agregamos a ella*/
  //socket.emit('load room', roomLoadMessages)
  socket.on('new room message', function (payload) { // recibimos mensajes de nuestra habitacion
    console.log('nuevo mensaje en el canal: '+payload.message)
  })

  // cargamos mensajes viejos
  socket.on('load old messages', function (payload) {
    const messages = payload.roomMessages
    const to = payload.to
    console.log('new message to:'+to)
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
            $chat.append(`<span style="font-weight: 700; color: #ff5400;">${messages[i].room}:</span> ${messages[i].message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${messages[i].from}</span><br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
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
    // envia whisper
    if ($messageBox.val().substring(0, 2) == '/w') {
      const decryptedCommand = decryptCommand($messageBox.val())
      console.log('enviando datos')
      data = {
        from: userId,
        to: decryptedCommand.name,
        message: decryptedCommand.message
      }
      socket.emit('whisper', data)
      // socket.emit('join room', data.to)
      $messageBox.val('')
    } else {
      console.log('enviando datos')
      data = {
        from: userId,
        message: $messageBox.val(),
        room
      }
      socket.emit('send message', data)
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
    if (data.from == userId) {
      $chat.append(`<span style="font-weight: 700; color: #ff8f00;">me:</span> ${data.message}<br/><span class="messageDate">${messageDate}</span></br>`)
    } else {
      if (data.room === 'All') {
        $chat.append(`<span style="font-weight: 700; color: #ff5400;">${data.room}:</span> ${data.message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${data.from}</span><br/><span class="messageDate">${messageDate}</span></br>`)
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
    console.log('asked for new messages?')
    const data = {
      messageId: oldIdLoaded_FirstMessage,
      userId,
      room
    }
    socket.emit('ChargeMoreMessages', data)
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
          $chat.prepend(`<span style="font-weight: 700; color: #ff5400;">${messages[i].room}:</span> ${messages[i].message} <span style="color: #9c9c9c; font-size: 13px;">... This was a message for everyone on the website. from: ${messages[i].from}</span><br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
        } else {
          $chat.prepend(`<span style="font-weight: 700; color: #ff8f00;">${messages[i].from}:</span> ${messages[i].message}<br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
        }
      }
    }
  })

  // recive lista con los usuarios renovada
  socket.on('user list update', function (payload) {
    // actualizamos la lista de usuarios
    users = payload.users
    $usersList.empty()
    $usersList.append('<h1 class="usersListHeader">Users Online</h1>')
    for( let i = 0; i < users.length; i++) {
      if (users[i] === userId) {
        $usersList.append(`<p>My id: ${users[i]}</p>`)
      } else{
      $usersList.append(`<p>${users[i]}</p>`)}
    }
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
      users = []
      roomConnection = {
        userId,
        room,
        loadOldMessage: true
      }
      socket.emit('new user', userId)
  
      socket.emit('join room', roomConnection)
    }
  })
})
