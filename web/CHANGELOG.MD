# WEB - changelog

## [v0.0.6] 2019-03-29

### Added

-   view 'chat_moderator' with the next commands:
    - /w <userId> <message> (a wishper that works with everyfrind online)
    - /R <userId> <message> (a message to answer the user)
    - <normal_message> (a message that all users can see)

### Changed

-   view 'chat' now can only send messages to the moderator (only works if the moderator is online too) but the user still have the command:
    - /w <userId> <message>
    - <normal_message> (a message that only the moderator online can see)

### Deleted

-   now the messages are not saved (until the work is done)

### Compatibility (for it to works well)

-   api ~0.0.2
-   mongoDB


## [v0.0.5] 2019-03-26

### Added

-   nothing

### Changed

-   view 'prueba/account/password' now connected with the _api server_ using **_JWT_**

### Deleted

-   nothing

### Compatibility (for it to works well)

-   api ~0.0.2
-   mongoDB


## [v0.0.4] 2019-03-25

### Added

-   nothing

### Changed

-   view 'prueba/account/password', it's connected with the _api server_

### Deleted

-   nothing

### Compatibility (for it to works well)

-   api ~0.0.1
-   mongoDB


## [v0.0.3] 2019-03-25

### Added

-   view 'prueba' to see if the server is working
-   view '/chat'
    1. Normal messages working fine separated by days and showing the hours and minutes of each message
    2. Whispers working with the commando: ``` /w <id> <message> ```
    3. Normal messages are saved with **_mongoDB_** and are showed only the last 6 messages saved
    4. Load older messages working, can be load with the button *See more messages*, the button charge packages of 6 messages
    5. List of *Friends* working at real time

### Changed

-   nothing

### Deleted

-   nothing

### Compatibility (for it to works well)

-   mongoDB


## [v0.0.2] 2019-03-22

### Added

-   view to send mails "http://localhost:3000/send/holaaaaa" but first need an email different than gmail

### Changed

-   nothing

### Deleted

-   nothing


## [v0.0.1] 2019-03-21

### Added

-   CHANGELOG
-   server

### Changed

-   nothing

### Deleted

-   nothing