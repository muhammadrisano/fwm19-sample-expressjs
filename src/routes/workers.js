const express = require('express')
const route = express.Router()
const workersController = require('../controller/workers')

route.post('/register', workersController.register)


module.exports = route