// require packages used in the project
const express = require('express')
const session = require('express-session')
// require express-handlebars here
const exphbs = require('express-handlebars')
/// /bodyParser
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
/// /handlebars helper
const helpers = require('handlebars-helpers')()
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

/// /引用路由器
const router = require('./routes')
const usePassport = require('./config/passport')
/// / mongoose connection
require('./config/mongoose')
/// /express-validator
const { body, validationResult } = require('express-validator')

// template engine
app.engine('handlebars', exphbs({
  helpers,
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
/// /static files
app.use(express.static('public'))
app.use(methodOverride('_method'))

// invoke
usePassport(app)
//flash
app.use(flash())
/// set res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes setting
app.use(router)

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})
