const pool = require("../configs/db");
const findByemail = (email, {relation} = {relation: ''}) =>{
  return pool.query(`SELECT users.id, users.email, users.role, users.password ${relation ? `, ${relation}.*`: ''} FROM users ${relation ? ` JOIN ${relation} ON users.id = user_id`: ''} WHERE email = $1`, [email])
}

const create = ({id, email, password, role})=>{
  return pool.query('INSERT INTO users(id, email, password, role)VALUES($1, $2, $3, $4)', [id, email, password, role])
}
module.exports = {
  findByemail,
  create
}