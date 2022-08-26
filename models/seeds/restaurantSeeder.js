/// / require model
const Restaurant = require('../restaurantModel.js')
/// require json
const restaurantList = require('./restaurant.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('DB connected')
  Restaurant.create(restaurantList)

  console.log('done')
})
