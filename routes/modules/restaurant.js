const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurantModel')

/// add new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

/// / post a new restaurant
router.post('/', (req, res) => {
  const newRestaurant  = req.body
  newRestaurant.userId = req.user._id
  return Restaurant.create( newRestaurant)
    .then(newRestaurant => res.redirect(`/restaurant/${newRestaurant._id}`))
    .catch(err => {
      return res.render('error', { err })
    })
})

// render show by id
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId  })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => {
      return res.render('error', { err })
    })
})

/// / get into update page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => {
      return res.render('error', { err })
    })
})

/// //save update
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newDetail = req.body

  return Restaurant.findOneAndUpdate({ _id, userId }, newDetail)
    .then(() => res.redirect(`/restaurant/${_id}`))
    .catch(err => {
      return res.render('error', { err })
    })
})

/// //delete function
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.deleteOne({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => {
      return res.render('error', { err })
    })
})

module.exports = router
