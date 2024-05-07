const { response } = require("../helper/common")

const uploadSingle = (req, res, next)=>{

  // const namaFile = req.body.file_name
  const data = {
    file: `http://localhost:4000/file/`+req.file.filename,
    // setingName: namaFile
  }
  
  response(res, data, 201, 'upload file success')
}

module.exports = {
  uploadSingle
}