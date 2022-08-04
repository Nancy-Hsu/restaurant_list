// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

////model
const Restaurant = require('./models/restaurantModel')


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


////bodyParser 
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))


////static files
app.use(express.static('public'))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//routes setting
////首頁
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then( restaurants => res.render('index', { restaurants }) )
  .catch(error => console.log(error))
})

///// add new restaurant
app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

app.post('/restaurant', (req, res) => {
const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(newRestaurant => res.redirect(`/restaurant/${newRestaurant._id}`))
})


//render show by id
app.get('/restaurant/:id', (req,res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('show', { restaurant }))
  .catch(error => console.log(error))
})


//// get into update page
app.get('/restaurant/:id/edit', (req,res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('edit',{ restaurant }))
    .catch(error => console.log(error))
})

/////save update
app.put('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const newDetail = req.body
  return Restaurant.findById(id)
  .then( restaurant => {
    for(let key in newDetail) {
      restaurant[key] = newDetail[key]
    }
    return restaurant.save()
  }).then(() => res.redirect(`/restaurant/${id}`)).catch(error => console.log(error))
})


/////delete function
app.delete('/restaurant/:id', (req, res) => {
  const _id = req.params.id
  Restaurant.deleteOne( { _id } )
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})


////search routes
app.get('/search/', (req, res) => {

  const keyword = req.query.keyword.trim()
  Restaurant.find()
  .lean()
  .then(restaurants => {
    const filterRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword)
    )
    if (!filterRestaurants.length) {
    const resultNotify = '-----沒有符合的搜尋，或許以下有你感興趣的餐廳？-------'
    return res.render('index', { alert: resultNotify, restaurants, keyword })
  } 
    res.render('index', { restaurants: filterRestaurants, keyword })
}).catch(error => console.log(error))
})





app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})