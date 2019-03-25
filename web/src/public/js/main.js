'use strict'
const userId = Math.random() * (10 - 1) + 1
let users = []

// Aqui ponemos jquery para no tener que usar react
$(function () {
  const socket = io() // IO is defined on the html
  
  console.log('id....'+userId)

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

  // EVENTS
  socket.emit('new user', userId)

  socket.on('load users', function (users) {
    $usersList.empty()
    $usersList.append('<h1 class="usersListHeader">Friends</h1>')
    for( let i = 0; i < users.length; i++) {
      if (users[i] === userId) {
        $usersList.append(`<p>My id: ${users[i]}</p>`)
      } else{
      $usersList.append(`<p>${users[i]}</p>`)}
    }
  })

  // cargamos mensajes viejos
  socket.on('load old messages', function (messages) {
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
      $chat.append(`<span style="font-weight: 700; color: #ff8f00;">${messages[i].from}:</span> ${messages[i].message}<br/><span class="messageDate">${Hour}:${Minute}</span></br>`)
      if (messages[i + 1]) {
        const nextMinute = messages[i + 1].created_at.substr( 8, 2 )
        if (nextMinute !== Day) {
          $chat.append(`<div style="width:100%; text-align: center; color: #9c9c9c; font-size: 11px;">${Day}</div>`)
        }
      }
    }
  })

  // recibe nuevo usuario conectado
  socket.on('new user connected', function (newUserId) {
    console.log(`new user connected: ${newUserId}`)
    if (userId === newUserId) {
      $usersList.append(`<p>My id: ${userId}</p>`)
    } else {
      users.push(userId)
      $usersList.append(`<p>${newUserId}</p>`)
    }
  })

  // enviando mensaje
  $messageForm.submit(event => {
    event.preventDefault() // previene el refrescado de pagina cada que damos clic al boton submit
    // envia whisper
    if ($messageBox.val().substring(0, 2) == '/w') {
      let indexof = $messageBox.val().indexOf(' ')
      const command = $messageBox.val().substr(0, indexof) // "/w"

      let temporal = $messageBox.val().substr(parseInt(indexof) + 1, $messageBox.val().length) // "name message"
      indexof = temporal.indexOf(' ')

      let name = temporal.substr(0, indexof) // "name"
      let message = temporal.substr(parseInt(indexof) + 1, temporal.length) // "message"
      // console.log(`command: ${command} name: ${name} message: ${message}`)
      const data = {
        from: userId,
        to: name,
        message
      }
      socket.emit('whisper', data)
      $messageBox.val('')
    } else {
      console.log('enviando datos')
      const data = {
        from: userId,
        message: $messageBox.val()
      }
      socket.emit('send message', data)
      $messageBox.val('')
    }
  })

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
      $chat.append(`<span style="font-weight: 700; color: #ff8f00;">${data.from}:</span> ${data.message}<br/><span class="messageDate">${messageDate}</span></br>`)
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
      userId
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
        $chat.prepend(`<span style="font-weight: 700; color: #ff8f00;">${messages[i].from}:</span> ${messages[i].message}<br/><span class="messageDate">${Hour}:${Day}</span></br>`)
      }
    }
  })

  // recive lista con los usuarios renovada
  socket.on('user disconnected', function (users) {
    $usersList.empty()
    $usersList.append('<h1 class="usersListHeader">Friends</h1>')
    for( let i = 0; i < users.length; i++) {
      if (users[i] === userId) {
        $usersList.append(`<p>My id: ${users[i]}</p>`)
      } else{
      $usersList.append(`<p>${users[i]}</p>`)}
    }
  })
})
