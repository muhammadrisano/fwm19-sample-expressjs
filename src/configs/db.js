const {Pool} = require('pg')
// import { Pool } from "pg"

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

module.exports = pool
// export default pool