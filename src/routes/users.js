const express = require('express')
const usersController = require('../controller/users')
const route = express.Router()

route.post('/login', usersController.login)


module.exports = route