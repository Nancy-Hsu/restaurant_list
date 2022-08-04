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

//// mongoose connection
require('./config/mongoose')


////bodyParser 
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))


////static files
app.use(express.static('public'))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

////引用路由器
const router = require('./routes')


app.use(router)
//routes setting
////首頁








app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})