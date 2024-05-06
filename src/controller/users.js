const createHttpError = require('http-errors')
const usersModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('../helper/common')
const { generateToken, generateRefreshToken } = require('../helper/auth')

const login = async(req, res, next) =>{
  try {
    const {email, password} = req.body
  
    const {rows:[user]} =  await usersModel.findByemail(email)
    if(!user){
      return next(createHttpError(403, 'email atau password salah'))
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if(!validPassword){
      return next(createHttpError(403, 'email atau password salah'))
    }
    delete user.password
    const payload = {
      email: user.email,
      role: user.role
    }
    const token = generateToken(payload)
    const refreshToken = generateRefreshToken(payload)
    response(res, {...user, token, refreshToken}, 200, 'anda berhasil login')
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError())
  }

 
}

module.exports = {
  login
}