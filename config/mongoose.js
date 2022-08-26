/// / connect to mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.RES_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
  useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => console.log('DB error'))
db.once('open', () => console.log('DB connected'))

module.exports = db
