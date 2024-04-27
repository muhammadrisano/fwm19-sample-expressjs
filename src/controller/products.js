const pool = require("../configs/db");
const { selectAll, create, drop, update, selectOne } = require("../models/products");
const {response} = require('../helper/common')

const getProducts = async (req, res, next) => {
  const { rows } = await selectAll()

  response(res, rows, 200, 'get data success')
};

const createProduct = async (req, res, next) => {
  // const name = req.body.name
  // const description = req.body.description
  // const price = req.body.price
  // const stock = req.body.stok
  const { name, description, stock } = req.body;

  const data = {
    name,
    description,
    stock,
  };
  await create(data)
  response(res, data, 201, 'product berhasil ditambahkan')
};

const dropProduct = async(req, res, next)=>{
  const id = req.params.id
  await drop(id)
  
  response(res, {id}, 200, 'product berhasil dihapus')

}

const updateProduct = async(req, res, next)=>{
  const id = req.params.id
  const {name, description, stock} = req.body

  const data ={
    name,
    description,
    stock
  }
  await update(data, id)
 
  response(res, data, 200, 'product berhasil diupdate')
}

const detailProduct = async(req, res, next)=>{
  const id = req.params.id
  const {rows:[product]} = await selectOne(id)
  res.json({
    status: 'success',
    data: product
  })

}

module.exports = {
  getProducts,
  createProduct,
  dropProduct,
  updateProduct,
  detailProduct
};
