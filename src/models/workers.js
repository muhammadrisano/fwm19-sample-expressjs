const pool = require("../configs/db");
const register = ({id, name, phone, userId}) =>{
  return pool.query('INSERT INTO workers(id, name, phone, user_id)VALUES($1, $2, $3, $4)', [id, name, phone, userId])
}

module.exports = {
  register
}