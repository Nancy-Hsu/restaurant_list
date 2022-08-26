const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

/// / require model
const Restaurant = require('../restaurantModel.js')
const User = require('../userModel')
/// require json
const restaurantList = require('./restaurant.json').results

const db = require('../../config/mongoose')


const SEED_USERS = [
  {
    name: 'Nancy',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'John',
    email: 'user2@example.com',
    password: '12345678'
  },
]

db.once('open', () => {
  console.log('DB connected')
  SEED_USERS.map(SEED_USER => {
    let start = 0
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
      ).then(user => {
        if (user.email === 'user2@example.com'){
          start = 3
        }
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => {
            i += start
            restaurantList[i].userId = user._id
            
            return Restaurant.create(restaurantList[i])
          }))
      }).then(() => {
        
        console.log('done.')
        process.exit()
      })
    
    console.log('done')
  })
})






