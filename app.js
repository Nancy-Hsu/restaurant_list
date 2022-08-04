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

////引用路由器
const router = require('./routes')


app.use(router)
//routes setting
////首頁








app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})