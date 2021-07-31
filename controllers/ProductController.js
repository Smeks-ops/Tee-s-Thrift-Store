const { Controller } = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const Product = require('../models/Product')

class ProductController extends Controller {
  constructor() {
    super(Product, process.env)
  }

  async get(params) {
    const products = await Product.find(params, Controller.parseFilters(params))
    return Product.convertToJson(products)
  }

  async getById(id) {
    const product = await Product.findById(id)
    if (product == null) {
      throw new Error(`${Product.resourceName} ${id} not found.`)
    }

    return product.summary()
  }

  async post(body) {
    if (body.name != null) {
      body.slug = utils.slugVersion(body.title, 6)
    }
    const product = await Product.create(body)
    return product.summary()
  }

  async put(id, params) {
    const product = await Product.findByIdAndUpdate(id, params, { new: true })
    return product.summary()
  }

  async delete(id) {
    const product = await Product.findByIdAndRemove(id)
    return product
  }
}

module.exports = new ProductController()

