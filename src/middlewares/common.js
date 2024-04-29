const myMiddleware = (req, res, next) =>{
  console.log('my middleware dijalankan');
  next()
}

const nameMiddle = (req, res, next)=>{
  console.log('my name is risnao');
  next()
}

module.exports = {
  myMiddleware,
  nameMiddle
}