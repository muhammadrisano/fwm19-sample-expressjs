const pool = require("../configs/db");

const selectAll = () =>{
  return pool.query("SELECT * FROM products ORDER BY id ASC");
}

const create = ({name, description, stock})=>{
  return pool.query(
    `INSERT INTO products (name, description, stock) VALUES ($1, $2, $3)`,
    [name, description, stock]
  );
} 

const drop = (id) =>{
  return pool.query("DELETE FROM products WHERE id = $1", [id])
}

const update = (data, id)=>{
  return pool.query("UPDATE products SET name= $1, description= $2, stock= $3 WHERE id = $4", [data.name, data.description, data.stock, id])
}

const selectOne = (id) =>{
  return pool.query("SELECT * FROM products WHERE id = $1", [id])
}

module.exports = {
  selectAll,
  create,
  drop,
  update,
  selectOne

}