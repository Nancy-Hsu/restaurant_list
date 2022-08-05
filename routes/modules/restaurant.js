const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurantModel')

/// add new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})



//// post a new restaurant
router.post('/', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(newRestaurant => res.redirect(`/restaurant/${newRestaurant._id}`))
    .catch(err => {
      return res.render('error', { err })
    })
})

//render show by id
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => {
      return res.render('error', { err })
    })
})

//// get into update page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => {
      return res.render('error', { err })
    })
})

/////save update
router.put('/:id', (req, res) => {
  const id = req.params.id
  const newDetail = req.body

  return Restaurant.findByIdAndUpdate(id, newDetail)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(err => {
      return res.render('error', { err })})
})


/////delete function
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Restaurant.deleteOne({ _id })
    .then(() => res.redirect('/'))
    .catch(err => {
      return res.render('error', { err })})
})



module.exports = router