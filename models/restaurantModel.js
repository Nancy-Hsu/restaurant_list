const { Number } = require('mongoose')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: { type: String },
  name_en: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  phone: { type: String },
  google_map: { type: String },
  rating: { type: Number },
  description: { type: String }

})

module.export = mongoose.model('Restaurant', restaurantSchema)