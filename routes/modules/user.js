const express = require('express')
const router = express.Router()
const User = require('../../models/userModel')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login', { login: true })
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/user/login',
  successRedirect: '/'
}))

router.post('/register', (req, res) => {
  const input = req.body
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'kindly fill up all the fields below.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Different password and confirmPassword !' })
  }

  if (errors.length) {
    return res.render('login', {
      errors, input, register: true
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'User already exists.' })
        return res.render('login', { errors, input, register: true })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

    }).catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout successfully !')
  res.redirect('/user/login')
})
module.exports = router
