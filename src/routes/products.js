const express = require('express')
const { getProducts, createProduct, updateProduct, dropProduct, detailProduct } = require('../controller/products')
const pool = require('../configs/db')
const { myMiddleware } = require('../middlewares/common')
const route = express.Router()
const {protect, checkRole} = require('../middlewares/auth')

// /product
route
  .get('/', myMiddleware, protect, checkRole('recruiter'),  getProducts)
  .post('/', createProduct)
  .delete('/:id',protect,  dropProduct)
  .put('/:id', protect,  updateProduct)
  .get('/:id', detailProduct )

module.exports = route