const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurantModel')

/// add new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

///search routes
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  if (!keyword.length) return  
  
  return Restaurant.find({
    '$or': [{ 'name': { '$regex': keyword, '$options': 'i' } }, { 'category': { '$regex': keyword, '$options': 'i' } }
    ]
  }).lean()
    .then(restaurants => {
      if (!restaurants.length) {
        const resultNotify = '-----沒有符合的搜尋，或許以下有你感興趣的餐廳？-------'
        return Restaurant.find().lean().then(restaurants =>  res.render('index', { alert: resultNotify, restaurants, keyword }))
      }
      res.render('index', { restaurants, keyword })
    })
})

//// post a new restaurant
router.post('/', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(newRestaurant => res.redirect(`/restaurant/${newRestaurant._id}`))
})

//render show by id
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//// get into update page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

/////save update
router.put('/:id', (req, res) => {
  const id = req.params.id
  const newDetail = req.body

  return Restaurant.findByIdAndUpdate(id, newDetail)
    .then(() => res.redirect(`/restaurant/${id}`)).catch(error => console.log(error))
})


/////delete function
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Restaurant.deleteOne({ _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router