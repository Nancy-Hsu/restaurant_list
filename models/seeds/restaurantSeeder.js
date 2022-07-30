//// connect to mongoose
const mongoose = require('mongoose')
//// require model
const Restaurant = require('../restaurantModel.js')
///require json
const restaurantList = require('./restaurant.json').results

mongoose.connect(process.env.RES_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db = mongoose.connection

db.on('error', () => console.log('DB error'))

db.once('open', () => { 
  console.log('DB connected')

  restaurantList.forEach(restaurant => {
    Restaurant.create({
      name: `${restaurant.name}`,
      name_en: `${restaurant.name_en}`,
      category: `${restaurant.category}`,
      image: `${restaurant.image}`,
      location: `${restaurant.location}`,
      phone: `${restaurant.phone}`,
      google_map: `${restaurant.google_map}`,
      rating: `${restaurant.rating}`,
      description: `${restaurant.description}`
    })
  });
  console.log('done')
})




