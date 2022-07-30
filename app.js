// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

//template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//// connect to mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.RES_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db = mongoose.connection

db.on('error', () => console.log('DB error'))
db.once('open', () => console.log('DB connected'))










///require json
const restaurantList = require('./restaurant.json').results

////static files
app.use(express.static('public'))

//routes setting
////首頁
app.get('/', (req, res) => {

  res.render('index', { restaurants : restaurantList})
})

////render show by id
app.get('/restaurants/:restaurant_id', (req,res) => {
  const restaurant_id = req.params.restaurant_id
  const restaurant = restaurantList.find(item => item.id.toString() === restaurant_id )
  res.render('show', { restaurant })
})


////search routes
app.get('/search/', (req, res) => {
  const keyword = req.query.keyword.trim()

  ////filter by name or type
  const filterRestaurants = restaurantList.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword))

  //// result or not setting
  if (!filterRestaurants.length) {
    const resultNotify = '-----沒有符合的搜尋，或許以下有你感興趣的餐廳？-------'
    res.render('index', { alert: resultNotify, restaurants: restaurantList, keyword: keyword })
  } else {
    res.render('index', { restaurants: filterRestaurants, keyword: keyword })
  }
})


app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})