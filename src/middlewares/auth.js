const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken')

const protect = (req, res, next) =>{
  try {
    const bearerToken = req.headers.authorization
    if(bearerToken && bearerToken.startsWith('Bearer')){
      const token = bearerToken.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
      // console.log(decoded);
      // const nama = "risano"
      // req.nama = nama
      req.decoded = decoded
      next()

    }else{
      next(createHttpError(400, 'Server Need Token'))
    }
  } catch (error) {
    if(error && error.name === 'TokenExpiredError'){
      next(createHttpError(400, 'token expired'))
    }else if(error && error.name === 'JsonWebTokenError'){
      next(createHttpError(400, 'token invalid'))
    }else if (error && error.name === 'NotBeforeError'){
      next(createHttpError(400, 'token not active'))
    }else{
      next(new createHttpError.InternalServerError())
    }
  }
}

module.exports = {
  protect
}