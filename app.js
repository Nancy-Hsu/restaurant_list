// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

////model
const Restaurant = require('./models/restaurantModel')

// require express-handlebars here
const exphbs = require('express-handlebars')

////bodyParser 
const bodyParser = require
('body-parser')

const methodOverride = require('method-override')

//// mongoose connection
require('./config/mongoose')
////引用路由器
const router = require('./routes')
////express-validator
const { body, validationResult } = require('express-validator');

////handlebars helper
const helpers = require('handlebars-helpers')();




//template engine
app.engine('handlebars', exphbs({ 
  helpers,
  defaultLayout: "main"
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

////static files
app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(router)
//routes setting
////首頁








app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})