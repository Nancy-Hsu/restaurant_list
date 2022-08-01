// require packages used in the project
const express = require('express')
const app = express()
const port = 3000


//// model
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

//routes setting
////首頁
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then( restaurants => res.render('index', { restaurants }) )
  .catch(error => console.log(error))
})

////render show by id
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
app.post('/restaurant/:id/edit', (req, res) => {
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
app.post('/restaurant/:_id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.deleteOne(id)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})



///delete


// ////search routes
// app.get('/search/', (req, res) => {
//   const keyword = req.query.keyword.trim()

//   ////filter by name or type
//   const filterRestaurants = restaurantList.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword))

//   //// result or not setting
//   if (!filterRestaurants.length) {
//     const resultNotify = '-----沒有符合的搜尋，或許以下有你感興趣的餐廳？-------'
//     res.render('index', { alert: resultNotify, restaurants, keyword })
//   } else {
//     res.render('index', { restaurants: filterRestaurants, keyword: keyword })
//   }
// })





app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})