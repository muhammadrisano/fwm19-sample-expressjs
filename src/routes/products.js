const express = require('express')
const { getProducts, createProduct, updateProduct, dropProduct, detailProduct } = require('../controller/products')
const pool = require('../configs/db')
const {hitCacheProductDetail, clearCacheProductDetail} = require('../middlewares/redis')
const { myMiddleware } = require('../middlewares/common')
const route = express.Router()
const {protect, checkRole} = require('../middlewares/auth')

// /product
route
  .get('/', myMiddleware, protect, checkRole('worker'),  getProducts)
  .post('/', createProduct)
  .delete('/:id',protect, clearCacheProductDetail,  dropProduct)
  .put('/:id', protect, clearCacheProductDetail,  updateProduct)
  .get('/:id', hitCacheProductDetail, detailProduct )

module.exports = route