const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pool = require('./src/configs/db')

const PORT = 4000
let products = []

app.use(bodyParser.json())

app.get('/helo', (req, res, next)=>{
  res.send('selamat datang di app bro...')
})


app.post('/products', async(req, res, next)=>{
  // const name = req.body.name
  // const description = req.body.description
  // const price = req.body.price
  // const stock = req.body.stok
  const {name, description, stock} = req.body

  const data = {
    name,
    description,
    stock
  }
  await pool.query(`INSERT INTO products (name, description, stock) VALUES ($1, $2, $3)`, [data.name, data.description, data.stock])

  res.status(201)
  res.json({
    status: 'success',
    message: 'data berhasil ditambahkan',
    data: data
  })
})

app.get('/products', async (req, res, next)=>{

  const {rows} = await pool.query("SELECT * FROM products ORDER BY id ASC")
  res.json({
    status: 'success',
    data:rows
  })
})

app.delete('/products/:id', async(req, res, next)=>{
  const id = req.params.id
  await pool.query("DELETE FROM products WHERE id = $1", [id])
  res.json({
    status: 'success',
    message: `product berhasil dihapus dengan id ${id}`
  })
})

app.put('/products/:id', async(req, res, next)=>{
  const id = req.params.id
  const {name, description, stock} = req.body

  const data ={
    name,
    description,
    stock
  }
  await pool.query("UPDATE products SET name= $1, description= $2, stock= $3 WHERE id = $4", [data.name, data.description, data.stock, id])
  res.json({
    status: 'success',
    data: data
  })
})

app.get('/products/:id', async(req, res, next)=>{
  const id = req.params.id
  const {rows:[product]} = await pool.query("SELECT * FROM products WHERE id = $1", [id])
  res.json({
    status: 'success',
    data: product
  })

})




app.listen(PORT, ()=>{
  console.log(`server running in port ${PORT}`);
})


// tugas
// 1. init project node untuk membuat crud simple yang sudah tebhubung ke database
// 2. CRUD bebas selain table products (terdiri dari minimal 4 field)
// 3. coba testing menggunakna postman