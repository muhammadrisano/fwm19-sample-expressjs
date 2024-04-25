
//core module
const path = require('path') 

const axios = require('axios')
// local module
const penjumlahan = require('./toolkit')

const result = penjumlahan(20, 10)

console.log(result);

const nameFile = "tugas1.pdf"

const format = path.extname(nameFile)
console.log(format);