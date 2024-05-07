const express = require('express')
const route = express.Router()
const workersController = require('../controller/workers')
const { protect } = require('../middlewares/auth')

route
.post('/register', workersController.register)
.get('/profile', protect,  workersController.profile)


module.exports = route