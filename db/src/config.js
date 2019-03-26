'use strict'

module.exports = {
  user: {
    uuid: 'yyy-yyy-yyb',
    username: 'Carlos Arturo GG',
    password: '12345'
  },
  configg: {
    database: process.env.DB_NAME || 'Webdb',
    username: process.env.DB_USER || 'Webdbuser',
    password: process.env.DB_PASS || 'webdbuserpassword',
    host: process.env.DB_HOST || 'localhost',
    port: '5433',
    dialect: 'postgres',
    setup: true /* SI NO SE TIENE EN TRUE, y la tabla no existe, no la va a crear */
    // operatorsAliases: false,
    // logging: s => debug(s)
  }
}
