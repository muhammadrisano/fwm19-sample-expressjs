const pool = require("../configs/db");
const { selectAll, create, drop, update, selectOne } = require("../models/products");

const getProducts = async (req, res, next) => {
  const { rows } = await selectAll()
  res.json({
    status: "success",
    data: rows,
  });
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
  res.status(201);
  res.json({
    status: "success",
    message: "data berhasil ditambahkan",
    data: data,
  });
};

const dropProduct = async(req, res, next)=>{
  const id = req.params.id
  await drop(id)
  res.json({
    status: 'success',
    message: `product berhasil dihapus dengan id ${id}`
  })
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
  res.json({
    status: 'success',
    data: data
  })
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
