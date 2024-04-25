const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const productsRoutes = require('./src/routes/products')

const PORT = 4000
app.use(bodyParser.json())

app.get('/helo', (req, res, next)=>{
  res.send('selamat datang di app bro...')
})

app.use('/products', productsRoutes)
// app.use('/users', userRoutes)

app.listen(PORT, ()=>{
  console.log(`server running in port ${PORT}`);
})


// tugas
// 1. init project node untuk membuat crud simple yang sudah tebhubung ke database
// 2. CRUD bebas selain table products (terdiri dari minimal 4 field)
// 3. coba testing menggunakna postman