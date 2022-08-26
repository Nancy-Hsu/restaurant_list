// require packages used in the project
const express = require('express')
const session = require('express-session')
// require express-handlebars here
const exphbs = require('express-handlebars')
////bodyParser 
const bodyParser = require
('body-parser')
const methodOverride = require('method-override')
////handlebars helper
const helpers = require('handlebars-helpers')();

////引用路由器
const router = require('./routes')
const usePassport = require('./config/passport')
//// mongoose connection
require('./config/mongoose')
////express-validator
const { body, validationResult } = require('express-validator');

const app = express()
const port = 3000

//template engine
app.engine('handlebars', exphbs({ 
  helpers,
  defaultLayout: "main"
}))
app.set('view engine', 'handlebars')
app.unsubscribe(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
////static files
app.use(express.static('public'))
app.use(methodOverride('_method'))

usePassport(app)
//routes setting
app.use(router)


app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})