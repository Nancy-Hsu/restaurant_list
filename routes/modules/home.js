const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurantModel')
let sort = 'name'

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(err => {
      return res.render('error', { err })
    })
})


///search routes
router.get('/search',(req, res) => {
  const keyword = req.query.keyword.trim()
  // if(!keyword.length) return

  return Restaurant.find({
    '$or': [{ 'name': { '$regex': keyword, '$options': 'i' } }, { 'category': { '$regex': keyword, '$options': 'i' } }
    ]
  }).lean()
    .sort(sort)
    .then(restaurants => {
      if (!restaurants.length) {
        return Restaurant.find().lean().then(restaurants => res.render('index', { restaurants, keyword, alert:true, sort }))
      }
      res.render('index', { restaurants, keyword })
    }).catch(err => {
      return res.render('error', {  err })
    })
})


router.get('/:sort/sort', (req, res) => {
  sort = req.params.sort

  Restaurant.find()
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants, sort}))
    .catch(err => {
      return res.render('error', { err })
    })
})




module.exports = router