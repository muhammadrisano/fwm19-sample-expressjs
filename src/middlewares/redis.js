
const setClient = require('../configs/redis')
const { response } = require('../helper/common')

const hitCacheProductDetail = async (req, res, next)=>{
  const client = await setClient()
  const idProduct = req.params.id
  const product = await client.get(`product/${idProduct}`)
  console.log(product);
  if(product){
    return response(res, JSON.parse(product), 200, 'get product success from redis')
  }
  next()
}

const clearCacheProductDetail = async (req, res, next)=>{
  const client = await setClient()
  const idProduct = req.params.id
  await client.del(`product/${idProduct}`)
  next()
}


module.exports = {
  hitCacheProductDetail,
  clearCacheProductDetail
}