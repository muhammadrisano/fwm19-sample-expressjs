
const pool = require("../configs/db");
const {
  selectAll,
  create,
  drop,
  update,
  selectOne,
  countProducts
} = require("../models/products");
const { response } = require("../helper/common");
const createError = require("http-errors");

const getProducts = async (req, res, next) => {
  try {
    console.log('email saya adaalah', req.decoded.email);
    // /products?page=1
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 3)
    const sort = req.query.sort || 'name'
    const sortBy = req.query.sortBy || 'ASC'
    const search = req.query.search || ''
    const offset = (page - 1) * limit

    const { rows } = await selectAll({
      limit,
      offset,
      sort,
      sortBy,
      search,
    });
    const {rows: [count]} = await countProducts()
    const totalData = count.total
    const totalPage = Math.ceil(totalData / limit)



    const pagination = {
      limit,
      page,
      totalData,
      totalPage
    }
    response(res, rows, 200, "get data success", pagination);
  } catch (err) {
    console.log(err);
    // const objError = new Error('terjadi kesalahan')
    // objError.statusCode = 501
    // const objErr = {
    //   message: 'terjadi kelahan',
    //   statusCode: 500
    // }
    // next(createError(501, 'terjadi error bro...'))
    next(new createError.InternalServerError());
    // next(createError(500, err.message))
  }
  // next()
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, stock } = req.body;

    const data = {
      id: 
      name,
      description,
      stock,
    };
    await create(data);
    await userModel.createUser(dataUser)

    response(res, data, 201, "product berhasil ditambahkan");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError())
  }
  // const name = req.body.name
  // const description = req.body.description
  // const price = req.body.price
  // const stock = req.body.stok
 

};

const dropProduct = async (req, res, next) => {
  const id = req.params.id;
  await drop(id);

  response(res, { id }, 200, "product berhasil dihapus");
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, stock } = req.body;

    const data = {
      name,
      description,
      stock,
    };
    await update(data, id);

    response(res, data, 200, "product berhasil diupdate");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError())
  }
};

const detailProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      rows: [product],
    } = await selectOne(id);
    if (!product) {
      next(createError(404, "Product Tidak Tersedia"));
      return;
    }
    res.json({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

module.exports = {
  getProducts,
  createProduct,
  dropProduct,
  updateProduct,
  detailProduct,
};
