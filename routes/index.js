const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/restaurant', authenticator, restaurant)
router.use('/user', user)
router.use('/', authenticator, home)

module.exports = router
