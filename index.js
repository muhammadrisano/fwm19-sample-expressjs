require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const commonMiddle  = require('./src/middlewares/common')

const productsRoutes = require('./src/routes/products')
// const usersRoutes = require('./src/routes/users')

const PORT = process.env.PORT
app.use(bodyParser.json())
app.use(morgan('dev'))


app.get('/helo', (req, res, next)=>{
  res.send('selamat datang di app bro...')
})

app.use('/products', productsRoutes)
// app.use('/users', usersRoutes)
// app.use('/users', userRoutes)




app.use((err, req, res, next)=>{
  // console.log(err);
  const messageError = err.message || 'Internal Server Error'
  const statusCode = err. statusCode || 500

  res.status(statusCode).json({
    message: messageError
  })
})

app.listen(PORT, ()=>{
  console.log(`server running in port ${PORT}`);
})


// tugas
// 1. init project node untuk membuat crud simple yang sudah tebhubung ke database
// 2. CRUD bebas selain table products (terdiri dari minimal 4 field)
// 3. coba testing menggunakna postman