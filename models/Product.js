const { Model } = require('vertex360')({ site_id: process.env.TURBO_APP_ID })

const props = {
  image: { type: String, default: '' },
  name: { type: String, default: '' },
  slug: { type: String, default: '' }, // unique identifier
  price: { type: Number, default: 0 },
  description: { type: String, default: '' },
  images: { type: Array, default: [] },
  schema: { type: String, default: 'product', immutable: true },
  timestamp: { type: Date, default: new Date(), immutable: true }
}

class Product extends Model {
  constructor() {
    super()
    this.schema(props)
  }
}

module.exports = Product
