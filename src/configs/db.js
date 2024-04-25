const {Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  database: 'fwm19',
  port: 5432
})

module.exports = pool